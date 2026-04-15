"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { usePosts } from "@/lib/social/posts-context";

type Stat = {
  label: string;
  value: string;
  trend: number; // percent
  description: string;
};

const baseStats: Omit<Stat, "value">[] = [
  { label: "Total Reach", trend: 12.4, description: "Last 30 days" },
  { label: "Posts This Week", trend: 7.1, description: "vs last week" },
  { label: "Avg Engagement", trend: -2.3, description: "Across all platforms" },
  { label: "Scheduled", trend: 0, description: "Upcoming posts" },
];

export function StatsGrid() {
  const { posts } = usePosts();
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const values = ["34,841", "14", "4.88%", String(scheduledCount)];
  const stats: Stat[] = baseStats.map((s, i) => ({
    ...s,
    value: values[i] ?? "—",
  }));

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</span>
          <span className="text-3xl font-bold tracking-tight">{s.value}</span>
          <div className="flex items-center gap-1.5 text-xs">
            {s.trend !== 0 ? (
              <>
                {s.trend > 0 ? (
                  <TrendingUp className="size-3.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-3.5 text-red-400" />
                )}
                <span className={s.trend > 0 ? "text-emerald-500" : "text-red-400"}>
                  {s.trend > 0 ? "+" : ""}
                  {s.trend}%
                </span>
              </>
            ) : null}
            <span className="text-muted-foreground">{s.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
