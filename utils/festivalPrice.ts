// /utils/festivalPrice.ts

export type PricingItem = {
    label: string;
    price: number;
};

export type PricingCategory = {
    category: string;
    items: PricingItem[];
};

export type FestivalPricing = {
    title: string;
    categories: PricingCategory[];
};

export const festivalPricing: FestivalPricing[] = [
    {
        title: "焼きそば",
        categories: [
            {
                category: "料金表",
                items: [
                    { label: "焼きそば大", price: 250 },
                    { label: "焼きそば小", price: 200 },
                ],
            },
        ],
    },
    {
        title: "定時制",
        categories: [
            {
                category: "食品販売",
                items: [
                    { label: "インドカレー", price: 250 },
                ],
            },
            {
                category: "物品販売",
                items: [
                    { label: "手芸", price: 100 },
                ],
            },
        ],
    },
];
