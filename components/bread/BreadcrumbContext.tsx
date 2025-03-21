"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Breadcrumb {
    name: string;
    href: string;
    icon?: ReactNode; // アイコンをサポート
}

interface BreadcrumbContextType {
    breadcrumbs: Breadcrumb[];
    setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void;
}

// 初期値を空の配列に設定
const BreadcrumbContext = createContext<BreadcrumbContextType>({
    breadcrumbs: [], // 空配列に変更
    setBreadcrumbs: () => { },
});

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
    // useState の初期値を空配列に設定
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};

export const useBreadcrumb = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
    }
    return context;
};
