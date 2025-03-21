// /app/event/page.tsx
"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import { festivalItems } from "@/utils/festival";
import { FestivalDetail, festivalDetail } from "@/utils/festivaldetail";
import { FestivalItem } from "@/types/festival";
import { supabase } from "@/utils/supabase/supabase";
// 料金情報のインポート
import { festivalPricing } from "@/utils/festivalPrice";

export default function ClassPage() {
    const router = useRouter();
    const params = useParams();
    const { className } = params;
    const { setBreadcrumbs } = useBreadcrumb();
    const [event, setEvent] = useState<FestivalItem | null>(null);
    const [detail, setDetail] = useState<FestivalDetail | null>(null);
    // 混雑状況ではなくステータスメッセージを扱う
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const updateBreadcrumbs = useCallback(() => {
        if (className) {
            const decodedClassName = decodeURIComponent(className as string);
            setBreadcrumbs([
                { name: "イベント", href: "/event" },
                { name: decodedClassName, href: `/event/${className}` },
            ]);
        }
    }, [className, setBreadcrumbs]);

    useEffect(() => {
        if (className) {
            const decodedClassName = decodeURIComponent(className as string);
            // className に基づいてイベントを検索
            const foundEvent = festivalItems.find(
                (item) => item.title === decodedClassName
            );
            const foundDetail = festivalDetail.find(
                (item) => item.title === decodedClassName
            );
            if (foundEvent) {
                setEvent(foundEvent);
            } else {
                // イベントが見つからない場合は404ページへリダイレクト
                router.push("/404");
            }
            if (foundDetail) {
                setDetail(foundDetail);
            }
            updateBreadcrumbs();
        }
    }, [className, updateBreadcrumbs, router]);

    // イベントが取得できたら、Supabase からステータスメッセージを取得
    useEffect(() => {
        async function fetchStatusMessage() {
            if (event) {
                const { data, error } = await supabase
                    .from("status")
                    .select("status")
                    .eq("name", event.title)
                    .single();
                if (error) {
                    console.error("ステータスメッセージの取得エラー", error);
                    return;
                }
                if (data) {
                    setStatusMessage(data.status);
                }
            }
        }
        fetchStatusMessage();
    }, [event]);

    // イベントに対応する料金情報を取得
    const pricingInfo = festivalPricing.find(
        (item) => event && item.title === event.title
    );

    if (!event) {
        return <div>読み込み中...</div>;
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* ヘッダー：サンプル画像 */}
            <header className="relative w-full h-64 mb-4">
                <Image
                    src="/twitter-image.jpg" // サンプル画像。実際はイベント画像に差し替え
                    alt={`${event.title}のヘッダー画像`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                />
            </header>

            {/* イベントタイトル */}
            <h1 className="text-3xl font-bold">{event.title}</h1>

            {/* ステータスメッセージの表示 */}
            <div className="my-4">
                <p className="font-bold">お知らせ</p>
                <p className="mb-1">
                    {statusMessage !== null
                        ? statusMessage
                        : "現在お知らせはありません。"}
                </p>
            </div>

            <div className="my-4">
                <p className="font-bold">内容</p>
                <p className="mb-1" style={{ whiteSpace: 'pre-line' }}>
                    {detail?.detail}
                </p>
            </div>

            {/* 料金情報の表示 */}
            {pricingInfo &&
                pricingInfo.categories.map((category, index) => (
                    <div key={index} className="mt-4" style={{ width: "100%" }}>
                        <h2 className="text-xl font-bold">{category.category}</h2>
                        <table className="border-collapse mt-2" style={{ width: "100%", maxWidth: "800px" }}>
                            <thead>
                                <tr>
                                    <th className="border p-2" style={{ width: "70%" }}>品目</th>
                                    <th className="border p-2" style={{ width: "30%" }}>料金</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.items.map((item, idx) => (
                                    <tr key={idx} className="text-center">
                                        <td className="border p-2" style={{ width: "70%" }}>{item.label}</td>
                                        <td className="border p-2" style={{ width: "30%" }}>{item.price}円</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            }

            {/* マップページへ飛ぶリンク */}
            <Link href={`/map/two?id=${encodeURIComponent(event.title)}`}>
                <div className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    展開マップ
                </div>
            </Link>
            <Link href={`/map/three?id=${encodeURIComponent(event.title)}`}>
                <div className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    構造マップ
                </div>
            </Link>
        </div>
    );
}
