"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";

export default function Errorpage() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "エラー", href: "/error" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <>
            <div>問題が発生しました</div>
            <div>これが複数回発生する場合は開発者に連絡してください</div>
        </>
    );
}
