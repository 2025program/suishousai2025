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

    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
    const dropdownBreadcrumbs = breadcrumbs.slice(0, -1); // 最後以外のパンくずリスト

    // サイドバーの状態に合わせたオフセット設定
    const SIDEBAR_WIDTH = "16rem";
    const SIDEBAR_WIDTH_ICON = "3rem";
    const sidebarWidth = !isMobile ? (state === "expanded" ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON) : "0";

    return (
        <>
            {/* 固定ヘッダー ※サイドバーの状態に応じて左オフセットと幅を調整 */}
            <header
                style={{
                    left: isMobile ? 0 : sidebarWidth,
                    width: isMobile ? "100%" : `calc(100% - ${sidebarWidth})`,
                }}
                className="
          fixed top-0 z-50 flex h-14 shrink-0 items-center gap-2
          transition-[width,left] ease-linear bg-white
        "
            >
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" aria-label="ホームページ">
                                    ホーム
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            {dropdownBreadcrumbs.length > 0 && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex items-center gap-1">
                                                <BreadcrumbEllipsis className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                {dropdownBreadcrumbs.map((crumb) => (
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

                            {lastBreadcrumb && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={lastBreadcrumb.href} aria-label={`${lastBreadcrumb.name}ページ`}>
                                            {lastBreadcrumb.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            {/* 固定ヘッダー分の高さ（ここでは h-16: 約4rem）を空ける */}
            <div className="pt-14">{children}</div>
        </>
    );
}

export default function Header({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <HeaderContent>{children}</HeaderContent>
            </SidebarInset>
        </SidebarProvider>
    );
}
