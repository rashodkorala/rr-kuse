"use client";

import * as React from "react";
import {
  BarChart3,
  Calendar,
  CalendarDays,
  Clock,
  FolderOpen,
  Gauge,
  Image,
  Instagram,
  FileText,
  PenSquare,
  Settings,
  Share2,
  Sparkles,
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
  navSocial: [
    { title: "Social Dashboard", url: "/social/dashboard", icon: BarChart3 },
    { title: "Compose", url: "/social/compose", icon: PenSquare },
    { title: "Calendar", url: "/social/calendar", icon: CalendarDays },
    { title: "Platforms", url: "/social/platforms", icon: Share2 },
    { title: "Post History", url: "/social/history", icon: Clock },
    { title: "AI Suggestions", url: "/social/ai-suggestions", icon: Sparkles },
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
                <span className="truncate text-lg font-bold">Rob Roy & Konfusion</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarGroupLabel>Social</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSocial.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
