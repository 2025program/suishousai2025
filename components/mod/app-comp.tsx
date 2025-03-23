// /app-comp.tsx
"use client"

import * as React from "react"
import {
    Box,
    Cookie,
    Drum,
    Info,
    LucideIcon,
    Map,
    MapPinned,
    MessageSquareWarning,
    Moon,
    ScrollText,
    Soup,
    Sun,
    Ticket,
    TriangleAlert,
    Users,
} from "lucide-react"

import { NavMain } from "@/components/mod/nav-main"
import { NavProjects } from "@/components/mod/nav-projects"
import {
    Sidebar,
    SidebarContent,
    SidebarRail,
} from "@/components/ui/sidebar"

import { festivalItems } from "@/utils/festival"

type PredefinedGroup = {
    title: string;
    search: string;
    cookie_title: string;
    url: string;
    itemBasePath: string;
    icon: LucideIcon;
    items: any[];
}

const predefinedNavMain = [
    {
        title: "概要",
        cookie_title: "gaiyou",
        url: "/about",
        icon: Info,
        items: [
            {
                title: "翠翔祭とは",
                url: "/about/absui",
            },
            {
                title: "スタッフ",
                url: "/about/stuff",
            },
        ],
    },
    {
        title: "マップ",
        cookie_title: "map",
        url: "/map",
        icon: Map,
        items: [
            {
                title: "平面マップ",
                url: "/map/two",
                icon: MapPinned,
            },
            {
                title: "階層マップ",
                url: "/map/three",
                icon: Box,
            },
        ],
    },
];

const projects = [
    {
        name: "お知らせ",
        url: "/announce",
        icon: MessageSquareWarning,
    },
    {
        name: "整理券情報",
        url: "/crowded",
        icon: Ticket,
    },
    {
        name: "注意事項",
        url: "/attention",
        icon: TriangleAlert,
    },
    {
        name: "クッキー設定",
        url: "/setting",
        icon: Cookie,
    },
    {
        name: "プライバシーポリシー",
        url: "/setting/privacy",
        icon: ScrollText,
    },
    {
        name: "管理",
        url: "/admin/login",
        icon: Users,
    },
];

// 属性ごとのキーを固定文字列にするためのヘルパー関数
const getAttributeKey = (attr: LucideIcon): string => {
    if (attr === Drum) return "drum";
    if (attr === Sun) return "sun";
    if (attr === Moon) return "moon";
    if (attr === Soup) return "soup";
    return "other";
};

const groups: Record<string, PredefinedGroup> = {};

// 各イベントについて、持っている属性ごとにグループに登録する
festivalItems.forEach(item => {
    item.attributes.forEach(attr => {
        const key = getAttributeKey(attr);
        if (!groups[key]) {
            // キーに応じたタイトル・cookie_title を設定
            let title = "";
            let cookie_title = "";
            let search = "";
            if (key === "drum") {
                title = "野外ステージ";
                search = "野外";
                cookie_title = "outside";
            } else if (key === "sun") {
                title = "全日制クラス";
                cookie_title = "daytime";
                search = "全日";
            } else if (key === "moon") {
                title = "定時制クラス";
                cookie_title = "evening";
                search = "定時";
            } else if (key === "soup") {
                title = "食品販売";
                cookie_title = "food";
                search = "食販";
            } else {
                title = "その他";
                cookie_title = "other";
                search = "その他";
            }
            groups[key] = {
                title,
                search,
                cookie_title,
                url: "/event",
                itemBasePath: "/event",
                icon: attr,
                items: [],
            }
        }
        // 重複を避けるため、既に同じタイトルが登録されていないか確認してから追加
        if (!groups[key].items.find((i: any) => i.title === item.title)) {
            groups[key].items.push(item);
        }
    });
});

const festivalNavMainEntries = Object.values(groups).map(group => ({
    title: group.title,
    search: group.search,
    cookie_title: group.cookie_title,
    url: group.url,
    icon: group.icon,
    items: group.items.map(item => ({
        title: item.title,
        url: `${group.itemBasePath}/${encodeURIComponent(item.title)}`,
        // ここではグループの属性アイコンを利用
        icon: group.icon,
        reading: item.reading,
    })),
}));

const combinedNavMain = [...predefinedNavMain, ...festivalNavMainEntries];

const data = { navMain: combinedNavMain, projects };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" side="right" variant="sidebar" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
