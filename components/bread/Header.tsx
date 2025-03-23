"use client";

import React, { ReactNode } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/mod/app-comp";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useBreadcrumb } from "@/components/bread/BreadcrumbContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ヘッダー内部のコンテンツ（SidebarProvider 内で呼ばれる）
function HeaderContent({ children }: { children: ReactNode }) {
    const { breadcrumbs } = useBreadcrumb();
    const { isMobile, state } = useSidebar();

    // ここでは右サイドバー用の調整を行っています
    const side = "right"; // 右サイドバーの場合
    const SIDEBAR_WIDTH = "16rem";
    const SIDEBAR_WIDTH_ICON = "3rem";
    const sidebarWidth = !isMobile ? (state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON) : "0";

    // 右サイドバーの場合は、left:0 で右側に余白を作成
    const headerStyle = isMobile
        ? { left: 0, width: "100%" }
        : side === "right"
            ? { left: 0, right: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }
            : { left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` };

    return (
        <>
            <header
                style={headerStyle}
                className="w-full fixed top-0 z-50 flex h-14 items-center gap-2 transition-[width,left] ease-linear bg-white"
            >
                <div className="w-full flex items-center gap-2 px-4">
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" aria-label="ホームページ">
                                    ホーム
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {breadcrumbs.length > 1 && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1">
                                                <BreadcrumbEllipsis className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                {breadcrumbs.slice(0, -1).map((crumb) => (
                                                    <DropdownMenuItem key={crumb.href}>
                                                        <BreadcrumbLink href={crumb.href} aria-label={`${crumb.name}ページ`}>
                                                            {crumb.name}
                                                        </BreadcrumbLink>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </BreadcrumbItem>
                                </>
                            )}
                            {breadcrumbs[breadcrumbs.length - 1] && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={breadcrumbs[breadcrumbs.length - 1].href}
                                            aria-label={`${breadcrumbs[breadcrumbs.length - 1].name}ページ`}
                                        >
                                            {breadcrumbs[breadcrumbs.length - 1].name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="trigger">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </div>
            </header>
            {/* ヘッダー分の高さを空ける */}
            <div className="pt-14">{children}</div>
        </>
    );
}


export default function Header({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarInset>
                <HeaderContent>{children}</HeaderContent>
            </SidebarInset>
            <AppSidebar />
        </SidebarProvider>
    );
}
