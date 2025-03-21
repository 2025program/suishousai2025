// components/NotificationBox/NotificationBox.tsx
"use client";

import React, { useEffect, useState } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import { supabase } from "@/utils/supabase/supabase";
import { Database } from "@/types/database";
import { FaBullhorn } from "react-icons/fa";
import styles from "./NotificationBox.module.css";

// Supabase CLI で生成された型から announce テーブルの型を取得
type Announcement = Database["public"]["Tables"]["announce"]["Row"];

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

const NotificationBox: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnnouncements() {
            setLoading(true);
            const { data, error } = await supabase
                .from("announce")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching announcements:", error);
            } else {
                setAnnouncements(data ?? []);
            }
            setLoading(false);
        }
        fetchAnnouncements();
    }, []);

    return (
        <div className={styles.notificationBox}>
            <div className={styles.header}>
                <FaBullhorn className={styles.headerIcon} />
                <h2 className={styles.title}>お知らせ</h2>
            </div>
            {loading && <p>Loading announcements...</p>}
            {!loading && announcements.length === 0 && <p>No announcements found.</p>}
            <div className={styles.list}>
                {announcements.map((announcement) => (
                    <NotificationItem
                        key={announcement.id}
                        announcement={{
                            id: announcement.id,
                            date: formatDate(announcement.created_at),
                            headline: announcement.headline!,
                            title: announcement.title!,
                            content: "",
                            details: announcement.details!,
                            link: announcement.link!,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationBox;
