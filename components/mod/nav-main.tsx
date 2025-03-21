"use client"

import { ChevronRight, Home, Search, type LucideIcon } from "lucide-react"
import * as React from "react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { getCookieValue, setSiteCookie, getCookieConsent } from '@/utils/cookieManager'

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24

function NavMainItem({
    title,
    search,
    cookie_title,
    url,
    icon: Icon,
    items,
    cookieKey,
}: {
    title: string
    search?: string
    cookie_title: string
    url: string
    icon?: LucideIcon
    items?: { title: string; url: string; icon?: LucideIcon }[]
    cookieKey: string
}) {
    const [open1, setOpen1] = React.useState(false)

    React.useEffect(() => {
        const consent = getCookieConsent()
        if (!consent) return

        const val = getCookieValue(cookieKey)
        if (val !== null) {
            setOpen1(val === 'true')
        }
    }, [cookieKey])

    const handleOpenChange = (value: boolean) => {
        setOpen1(value)
        if (getCookieConsent()) {
            setSiteCookie(cookieKey, value.toString(), SIDEBAR_COOKIE_MAX_AGE)
        }
    }

    const { state, isMobile } = useSidebar()

    // 適切なイベント型を指定
    const handleStopPropagation = (
        e: React.MouseEvent<HTMLAnchorElement> | React.TouchEvent<HTMLAnchorElement>
    ) => {
        e.stopPropagation()
    }

    return (
        <Collapsible
            asChild
            open={open1}
            onOpenChange={handleOpenChange}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                {isMobile == true ? (
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            {Icon && <Icon />}
                            <span>{title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                ) : (
                    <>
                        {state === 'collapsed' ? (
                            <>
                                {url === "/event" ? (
                                    <a
                                        href={`/event?id=${encodeURIComponent(search!)}`}
                                        onClick={handleStopPropagation}
                                        onMouseDown={handleStopPropagation}
                                        onTouchStart={handleStopPropagation}
                                        className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0"
                                        aria-label="Icon Link"
                                    >
                                        <SidebarMenuButton tooltip={title}>
                                            {Icon && <Icon />}
                                        </SidebarMenuButton>
                                    </a>
                                ) : (
                                    <a
                                        href={url}
                                        onClick={handleStopPropagation}
                                        onMouseDown={handleStopPropagation}
                                        onTouchStart={handleStopPropagation}
                                        className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0"
                                        aria-label="Icon Link"
                                    >
                                        <SidebarMenuButton tooltip={title}>
                                            {Icon && <Icon />}
                                        </SidebarMenuButton>
                                    </a>
                                )}

                            </>
                        ) : (
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton>
                                    {Icon && <Icon />}
                                    <span>{title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        )}
                    </>
                )}

                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                    <a href={subItem.url}>
                                        <span>{subItem.title}</span>
                                    </a>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}

export function NavMain({
    items,
}: {
    items: {
        title: string
        search?: string
        cookie_title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
            icon?: LucideIcon
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>翠翔祭HP</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="トップページ">
                        <a href="/">
                            <Home />
                            <span>トップページ</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="検索">
                        <a href="/event">
                            <Search />
                            <span>検索</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                {items.map((item) => {
                    const cookieKey = `collapsible_${item.cookie_title}`
                    return (
                        <NavMainItem
                            key={item.title}
                            title={item.title}
                            search={item.search}
                            cookie_title={item.cookie_title}
                            url={item.url}
                            icon={item.icon}
                            items={item.items}
                            cookieKey={cookieKey}
                        />
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
