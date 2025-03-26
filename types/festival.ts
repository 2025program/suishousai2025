import { LucideIcon } from "lucide-react";

export type FestivalItem = {
    title: string;
    reading?: string;
    attributes: LucideIcon[];
    floor?: number;
    x?: number;
    y?: number;
    slug?: string;
    class?: string;
    location?: string;
}