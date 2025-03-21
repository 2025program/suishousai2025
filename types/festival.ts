import { LucideIcon } from "lucide-react";

export type FestivalItem = {
    title: string;
    reading?: string;
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