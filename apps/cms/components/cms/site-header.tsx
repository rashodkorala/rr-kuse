"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const titleMap: Record<string, string> = {
  "/": "Dashboard",
  "/performers": "Performers",
  "/events": "Events",
  "/deals": "Deals",
  "/gallery": "Gallery",
  "/videos": "Videos",
  "/posts": "Posts",
  "/content": "Content",
  "/instagram": "Instagram",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  return titleMap[pathname] ?? pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ?? "Dashboard";
}

export function SiteHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header
      className="flex shrink-0 items-center gap-2 border-b border-border px-4"
      style={{ height: "var(--header-height, 3.5rem)" }}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <h1 className="text-base font-medium">{pageTitle}</h1>
    </header>
  );
}
