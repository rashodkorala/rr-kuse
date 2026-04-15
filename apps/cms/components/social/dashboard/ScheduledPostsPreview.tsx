"use client";

import { usePosts } from "@/lib/social/posts-context";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import Link from "next/link";

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ScheduledPostsPreview() {
  const { posts } = usePosts();
  const upcoming = posts
    .filter((p) => p.status === "scheduled")
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5);

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Upcoming Scheduled Posts</h3>
        <Link
          href="/social/calendar"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View calendar →
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {upcoming.map((post) => (
          <div
            key={post.id}
            className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{fmt(post.scheduledAt)}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {post.platforms.map((pid) => (
                <PlatformIcon key={pid} platform={pid} size={14} className="text-muted-foreground" />
              ))}
            </div>
          </div>
        ))}
        {upcoming.length === 0 && (
          <p className="text-sm text-muted-foreground">No upcoming posts scheduled.</p>
        )}
      </div>
    </div>
  );
}
