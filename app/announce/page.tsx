// pages/announce.tsx
"use client";

import { useEffect, useState } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import { supabase } from "@/utils/supabase/supabase";
import { Database } from "@/types/database";
import NotificationItem from "@/components/NotificationItem/NotificationItem";

// Supabase CLI で生成された型から announce テーブルの型を取得
type Announce = Database["public"]["Tables"]["announce"]["Row"];

// ISO 8601 の日付文字列を読みやすい形式に変換するヘルパー関数
function formatDate(dateStr: string | null): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function AnnouncePage() {
    const { setBreadcrumbs } = useBreadcrumb();
    const [announces, setAnnounces] = useState<Announce[]>([]);
    const [loading, setLoading] = useState(true);

    // Breadcrumb を更新
    useEffect(() => {
        setBreadcrumbs([{ name: "お知らせ", href: "/announce" }]);
    }, [setBreadcrumbs]);

    // announce テーブルからデータを取得
    useEffect(() => {
        async function fetchAnnounces() {
            setLoading(true);
            const { data, error } = await supabase
                .from("announce")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching announcements:", error);
            } else {
                setAnnounces(data ?? []);
            }
            setLoading(false);
        }
        fetchAnnounces();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold mb-4">お知らせ一覧</h1>
            {loading && <p>お知らせを取得中</p>}
            {!loading && announces.length === 0 && <p>お知らせはありませんでした</p>}
            <div className="space-y-4">
                {announces.map((announce) => (
                    <NotificationItem
                        key={announce.id}
                        announcement={{
                            id: announce.id,
                            date: formatDate(announce.created_at),
                            headline: announce.headline!,
                            title: announce.title!,
                            content: announce.content!,
                            details: "",
                            link: "",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
