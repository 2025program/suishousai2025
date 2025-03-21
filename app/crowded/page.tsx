"use client";
import React, { useEffect, useState } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import { supabase } from "@/utils/supabase/supabase";
import TicketItem, { TicketAnnouncement } from "@/components/TicketAnnouncementBox/TicketItem";

export default function Crowded() {
    const { setBreadcrumbs } = useBreadcrumb();
    const [tickets, setTickets] = useState<TicketAnnouncement[]>([]);
    const [loading, setLoading] = useState(true);

    // Breadcrumb を更新
    useEffect(() => {
        setBreadcrumbs([{ name: "整理券", href: "/crowded" }]);
    }, [setBreadcrumbs]);

    // Supabase から numbered が true の整理券情報を取得
    useEffect(() => {
        async function fetchTickets() {
            setLoading(true);
            const { data, error } = await supabase
                .from("status")
                .select("id, name, ticket")
                .eq("numbered", true)
                .order("id", { ascending: true });
            if (error) {
                console.error("Error fetching ticket information:", error);
            } else {
                setTickets(data as TicketAnnouncement[]);
            }
            setLoading(false);
        }
        fetchTickets();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold mb-4">整理券情報一覧</h1>
            {loading && <p>整理券情報を取得中</p>}
            {!loading && tickets.length === 0 && <p>整理券情報は見つかりませんでした</p>}
            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
}
