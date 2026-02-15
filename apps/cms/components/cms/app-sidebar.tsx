"use client";

import * as React from "react";
import {
  BarChart3,
  Calendar,
  FolderOpen,
  Gauge,
  Image,
  Instagram,
  FileText,
  Settings,
  Users,
  Wine,
  Video,
  BookOpen,
} from "lucide-react";

import { NavMain } from "@/components/cms/nav-main";
import { NavSecondary } from "@/components/cms/nav-secondary";
import { NavUser } from "@/components/cms/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    { title: "Dashboard", url: "/", icon: Gauge },
    { title: "Performers", url: "/performers", icon: Users },
    { title: "Events", url: "/events", icon: Calendar },
    { title: "Deals", url: "/deals", icon: Wine },
    { title: "Gallery", url: "/gallery", icon: Image },
    { title: "Videos", url: "/videos", icon: Video },
    { title: "Posts", url: "/posts", icon: FileText },
    { title: "Content", url: "/content", icon: FolderOpen },
    { title: "Instagram", url: "/instagram", icon: Instagram },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
  ],
  navSecondary: [
    { title: "Documentation", url: "/docs", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <span className="truncate text-lg font-bold">RR Kuse</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
