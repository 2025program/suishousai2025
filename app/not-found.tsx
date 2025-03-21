"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import Link from "next/link";

export default function NotFound() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "not found", href: "/" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-4 text-lg">お探しのページは見つかりませんでした。</p>
            <Link href="/">
                <div className="mt-6 text-blue-500 hover:underline">トップページへ戻る</div>
            </Link>
        </div>
    );
}
