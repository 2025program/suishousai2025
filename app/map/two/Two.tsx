"use client";
import { useState, useEffect, useMemo, createRef, RefObject } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/components/FlatMap.module.css";
import { normalizeSearchString } from "@/utils/normalizeKana";
import { FestivalItem } from "@/types/festival";
import { festivalItems } from "@/utils/festival";
import Image from "next/image";

// 座標計算の基準サイズ
const BASE_WIDTH = 1290;
const BASE_HEIGHT = 967;

interface PinProps {
    item: FestivalItem;
    isSelected: boolean;
    containerWidth: number;
    containerHeight: number;
}

const Pin: React.FC<PinProps> = ({
    item,
    isSelected,
    containerWidth,
    containerHeight,
}) => {
    if (!isSelected) return null;
    const scaleFactor = containerWidth / BASE_WIDTH;
    const baseIconSize = 100;
    const baseHitBoxSize = 40;
    const iconSize = Math.round(baseIconSize * scaleFactor);
    const hitBoxSize = Math.round(baseHitBoxSize * scaleFactor);
    const leftPx = item.x! * scaleFactor;
    const topPx = item.y! * scaleFactor;

    return (
        <div
            className={styles.pinWrapper}
            style={{
                left: `${leftPx}px`,
                top: `${topPx}px`,
                width: hitBoxSize,
                height: hitBoxSize,
                marginLeft: `-${hitBoxSize}px`,
                marginTop: `-${hitBoxSize}px`,
            }}
        >
            <div
                className={styles.pinContent}
                style={{
                    pointerEvents: "none",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    className={styles.iconWrapper}
                    style={{
                        width: iconSize,
                        height: iconSize,
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Image
                        src="/mappin.png"
                        alt="Map Pin"
                        width={iconSize}
                        height={iconSize}
                        priority
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>
        </div>
    );
};

const floors = [1, 2, 3, 4];

// カスタムフックはトップレベルで定義する
function useContainerDimensions(ref: RefObject<HTMLElement>) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (!ref.current) return;
        const updateDimensions = () => {
            const rect = ref.current!.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        };
        updateDimensions();
        const resizeObserver = new ResizeObserver(() => updateDimensions());
        resizeObserver.observe(ref.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);
    return dimensions;
}

interface FloorComponentProps {
    floor: number;
    containerRef: RefObject<HTMLDivElement>;
    selectedItem: FestivalItem | null;
}

const FloorComponent: React.FC<FloorComponentProps> = ({ floor, containerRef, selectedItem }) => {
    // コンテナは mapContainer に設定
    const { width, height } = useContainerDimensions(containerRef);
    return (
        <div className={styles.floorContainer}>
            <h2 className={styles.floorTitle}>{floor}階</h2>
            {/* ここに ref を設定 */}
            <div className={styles.mapContainer} ref={containerRef}>
                <img
                    src={`/maps/map-floor${floor}.svg`}
                    alt={`${floor}階`}
                    className={styles.mapImage}
                />
                {selectedItem && selectedItem.floor === floor && (
                    <Pin
                        item={selectedItem}
                        isSelected={true}
                        containerWidth={width}
                        containerHeight={height}
                    />
                )}
            </div>
        </div>
    );
};

export default function FlatMap() {
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<FestivalItem | null>(null);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [searchConfirmed, setSearchConfirmed] = useState<boolean>(false);

    const normalizedSearchQuery = normalizeSearchString(searchQuery);
    const suggestions = searchQuery
        ? festivalItems.filter((item) =>
            normalizeSearchString(item.title, item.reading).includes(normalizedSearchQuery)
        )
        : [];

    // URL のクエリパラメータ "id" をチェック
    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            const decodedId = decodeURIComponent(id);
            const foundEvent = festivalItems.find((item) => item.title === decodedId);
            if (foundEvent) {
                setSelectedItem(foundEvent);
                setSearchQuery(foundEvent.title);
                setSearchConfirmed(true);
            }
        }
    }, [searchParams]);

    const containerRefs = useMemo(() => {
        return floors.reduce<Record<number, RefObject<HTMLDivElement>>>((acc, floor) => {
            acc[floor] = createRef<HTMLDivElement>();
            return acc;
        }, {} as Record<number, RefObject<HTMLDivElement>>);
    }, []);

    useEffect(() => {
        if (selectedItem && searchConfirmed) {
            const targetRef = containerRefs[selectedItem.floor!];
            if (targetRef && targetRef.current) {
                targetRef.current.scrollIntoView({ behavior: "smooth" });
            }
            setSearchConfirmed(false);
        }
    }, [selectedItem, searchConfirmed, containerRefs]);

    return (
        <div className={styles.outerContainer}>
            {/* 検索ボックス */}
            <div className={styles.header}>
                <input
                    type="text"
                    placeholder="イベント検索"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    className={styles.searchInput}
                />
                {showSuggestions && suggestions.length > 0 && (
                    <div className={styles.suggestionList}>
                        {suggestions.map((item, index) => (
                            <div
                                key={index}
                                className={styles.suggestionItem}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setSearchQuery(item.title);
                                    setShowSuggestions(false);
                                    setSearchConfirmed(true);
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* マップ説明 */}
            <div className={styles.mapex}>
                <div className={styles.exfloor}>
                    <div className={styles.exname}>階段</div>
                    <div className={styles.excolor1}></div>
                </div>
                <div className={styles.exfloor}>
                    <div className={styles.exname}>男子トイレ</div>
                    <div className={styles.excolor2}></div>
                </div>
                <div className={styles.exfloor}>
                    <div className={styles.exname}>女子トイレ</div>
                    <div className={styles.excolor3}></div>
                </div>
                <div className={styles.exfloor}>
                    <div className={styles.exname}>多目的トイレ</div>
                    <div className={styles.excolor4}></div>
                </div>
            </div>

            {/* フロアごとの表示 */}
            <div className={styles.flatMapContainer}>
                {floors.map((floor) => (
                    <FloorComponent
                        key={floor}
                        floor={floor}
                        containerRef={containerRefs[floor]}
                        selectedItem={selectedItem}
                    />
                ))}
            </div>
        </div>
    );
}
