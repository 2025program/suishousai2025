"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";

export default function Stuff() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "概要", href: "/about" }, { name: "スタッフ", href: "/about/stuff" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <main className="p-8">
            <header className="mb-6">
                <h1 className="text-2xl">スタッフ</h1>
            </header>

            <section className="mb-6">
                <h2 className="text-xl mb-2">1. はじめに</h2>
                <p>
                    現在開発中なのでスタッフは正確には決まっていません。
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl mb-2">2. サイト開発</h2>
                <p>
                    Pent &#40;横浜翠嵐所属&#41;
                </p>
            </section>
        </main>
    );
}
