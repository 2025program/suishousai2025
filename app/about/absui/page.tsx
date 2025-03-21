"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";

export default function Absui() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "概要", href: "/about" }, { name: "翠翔祭とは", href: "/about/absui" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <main className="p-8">
            <header className="mb-6">
                <h1 className="text-2xl">翠翔祭とは</h1>
            </header>

            <section className="mb-6">
                <h2 className="text-xl mb-2">1. はじめに</h2>
                <p>
                    翠嵐の文化祭です
                </p>
            </section>
        </main>
    );
}
