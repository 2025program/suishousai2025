"use client";
import { useEffect, useCallback } from "react";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import Link from "next/link";

export default function Map() {
    const { setBreadcrumbs } = useBreadcrumb();

    const updateBreadcrumbs = useCallback(() => {
        setBreadcrumbs([{ name: "マップ", href: "/map" }]);
    }, [setBreadcrumbs]);

    useEffect(() => {
        updateBreadcrumbs();
    }, [updateBreadcrumbs]);

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] w-full">
            <Link href="/map/two" className="group flex-1 relative flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 transition-all">
                <h2 className="text-5xl font-bold text-gray-800 z-10">平面マップ</h2>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-all" />
            </Link>

            <Link href="/map/three" className="group flex-1 relative flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 transition-all">
                <h2 className="text-5xl font-bold text-gray-800 z-10">階層マップ</h2>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-all" />
            </Link>
        </div>
    );
}
