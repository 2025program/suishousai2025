// /utils/festival.ts
import {
    Drum,
    Moon,
    Soup,
    Sun,
    type LucideIcon,
} from "lucide-react";

export type FestivalItem = {
    title: string;
    reading?: string;
    // 複数の属性を持たせるため、icon プロパティを attributes 配列に変更
    attributes: LucideIcon[];
    floor?: number;
    x?: number;
    y?: number;
    slug?: string;
}

export type GroupInfo = {
    title: string;
    cookie_title: string;
    url: string;
    itemBasePath: string;
    icon: LucideIcon;
    items: FestivalItem[];
}

// 属性の優先順位（サイドバー上で「主要な」属性として使う）
export const attributePriority: LucideIcon[] = [Sun, Moon, Drum, Soup];

export const festivalItems: FestivalItem[] = [
    // 全日制イベント（属性は１つ）
    { title: '1-1', attributes: [Sun], floor: 4, x: 1165, y: 500 },
    { title: '1-2', attributes: [Sun], floor: 4, x: 1085, y: 500 },
    { title: '1-3', attributes: [Sun], floor: 4, x: 935, y: 500 },
    //{ title: '1-4', attributes: [Sun], floor: 4, x: 852, y: 500 },
    //{ title: '1-5', attributes: [Sun], floor: 4, x: 768, y: 500 },
    //{ title: '1-6', attributes: [Sun], floor: 4, x: 683, y: 500 },
    //{ title: '1-7', attributes: [Sun], floor: 4, x: 533, y: 500 },
    // 焼きそば：食販かつ全日制の属性を持たせる
    { title: '焼きそば', reading: "やきそば", attributes: [Sun, Soup], floor: 1, x: 865, y: 300 },
    // 野外ステージ
    { title: '腕相撲', reading: 'うでずもう', attributes: [Drum], floor: 1, x: 350, y: 350 },
    // 定時制
    { title: '定時制', reading: "ていじせい", attributes: [Moon, Soup], floor: 1, x: 865, y: 300 },
];
