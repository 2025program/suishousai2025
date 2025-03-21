// /app/event/page.tsx
"use client";

import React, { useEffect, useCallback, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import { festivalItems, attributePriority } from "@/utils/festival";
import { normalizeSearchString } from "@/utils/normalizeKana";
import { LucideIcon, Drum, Sun, Moon, Soup } from "lucide-react";

// 固定の属性候補（フィルター表示用）
const fixedAttributes: { icon: LucideIcon; title: string }[] = [
    { icon: Sun, title: "全日" },
    { icon: Soup, title: "食販" },
    { icon: Drum, title: "野外" },
    { icon: Moon, title: "定時" },
];

const EventPage: React.FC = () => {
    const { setBreadcrumbs } = useBreadcrumb();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // Breadcrumb の更新
    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "イベント", href: "/event" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    // 検索とフィルターの状態管理
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState<LucideIcon[]>([]);

    // 固定属性リストを利用するので、iconTypes は fixedAttributes から取得
    const iconTypes = fixedAttributes.map((attr) => attr.icon);

    // クエリパラメータに基づく初期フィルター設定（必要に応じて）
    useEffect(() => {
        if (id) {
            const matchedAttribute = fixedAttributes.find(
                (attr) => attr.title.toLowerCase() === id.toLowerCase()
            );
            if (matchedAttribute) {
                setSelectedAttributes([matchedAttribute.icon]);
            }
        }
    }, [id]);

    // ハンドラー
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleIconFilter = (icon: LucideIcon) => {
        setSelectedAttributes((prev) =>
            prev.includes(icon)
                ? prev.filter((i) => i !== icon)
                : [...prev, icon]
        );
    };

    // 正規化した検索文字列
    const normalizedSearchTerm = useMemo(
        () => normalizeSearchString(searchTerm),
        [searchTerm]
    );

    // フィルタリング：選択されたすべての属性が item.attributes に含まれるかを判定（AND 判定）
    const filteredItems = useMemo(() => {
        return festivalItems.filter((item) => {
            const itemSearchString = normalizeSearchString(item.title, item.reading);
            const matchesSearch = itemSearchString.includes(normalizedSearchTerm);
            const matchesAttribute =
                selectedAttributes.length === 0 ||
                selectedAttributes.every((attr) => item.attributes.includes(attr));
            return matchesSearch && matchesAttribute;
        });
    }, [normalizedSearchTerm, selectedAttributes]);

    // 各属性に対応する固定のカテゴリ名を返す
    const getCategoryTitle = (icon: LucideIcon) => {
        const found = fixedAttributes.find((attr) => attr.icon === icon);
        return found ? found.title : "カテゴリ";
    };

    return (
        <main className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                {/* ヘッダー */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        イベント検索
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-gray-600">
                        お気に入りのイベントを見つけよう
                    </p>
                </header>

                {/* メインコンテンツ */}
                <section className="bg-white rounded-xl shadow p-6">
                    {/* 検索バー */}
                    <div className="mb-4">
                        <label htmlFor="search" className="sr-only">
                            イベント検索
                        </label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="イベントを検索..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        />
                    </div>

                    {/* アイコンフィルター */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {iconTypes.map((IconComponent, index) => (
                            <button
                                key={index}
                                onClick={() => toggleIconFilter(IconComponent)}
                                className={`flex flex-col items-center justify-center w-14 h-14 border rounded-full transition transform focus:outline-none hover:scale-105 ${selectedAttributes.includes(IconComponent)
                                    ? "bg-purple-500 text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-purple-100"
                                    } text-center`}
                                title={`フィルター: ${getCategoryTitle(IconComponent)}`}
                                aria-label={`フィルター: ${getCategoryTitle(IconComponent)}`}
                            >
                                <IconComponent size={24} />
                                <span className="mt-1 text-xs">
                                    {getCategoryTitle(IconComponent)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* イベントリスト */}
                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`/event/${encodeURIComponent(item.title)}`}
                                    className="flex items-center p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow hover:shadow-lg transition"
                                >
                                    {/* 複数属性のうち、優先順位順に1つ目を主要属性として表示 */}
                                    {(() => {
                                        const primaryIcon =
                                            attributePriority.find((icon) =>
                                                item.attributes.includes(icon)
                                            ) || item.attributes[0];
                                        // コンポーネントとして使用するため大文字に
                                        const PrimaryIcon = primaryIcon;
                                        return (
                                            <PrimaryIcon
                                                className="text-purple-500 mr-4"
                                                size={24}
                                            />
                                        );
                                    })()}
                                    <h3 className="text-sm md:text-xl font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                </a>
                            ))
                        ) : (
                            <p className="text-center text-red-500 font-semibold col-span-full">
                                該当するイベントがありません。
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default EventPage;
