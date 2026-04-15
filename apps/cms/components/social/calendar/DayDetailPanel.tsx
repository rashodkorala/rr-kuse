"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScheduledPost } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: Date | null;
  posts: ScheduledPost[];
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DayDetailPanel({ open, onOpenChange, day, posts }: Props) {
  const label = day
    ? day.toLocaleDateString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Scheduled for {label}</SheetTitle>
          <SheetDescription>
            {posts.length === 0
              ? "No scheduled posts on this day."
              : `${posts.length} post${posts.length === 1 ? "" : "s"} in the demo queue.`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 overflow-y-auto pr-1 mt-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-border bg-background/80 p-3 flex flex-col gap-2"
            >
              <p className="text-sm leading-snug">{post.content}</p>
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>{fmt(post.scheduledAt)}</span>
                <span
                  className={
                    post.status === "scheduled"
                      ? "text-emerald-500"
                      : post.status === "draft"
                        ? "text-amber-500"
                        : "text-muted-foreground"
                  }
                >
                  {post.status}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {post.platforms.map((p) => (
                  <PlatformIcon key={p} platform={p} size={14} className="text-muted-foreground" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
