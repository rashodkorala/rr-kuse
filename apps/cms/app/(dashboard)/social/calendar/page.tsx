"use client";

import { useCallback, useMemo, useState } from "react";
import { CalendarToolbar } from "@/components/social/calendar/CalendarToolbar";
import { CalendarGrid } from "@/components/social/calendar/CalendarGrid";
import { DayDetailPanel } from "@/components/social/calendar/DayDetailPanel";
import { usePosts } from "@/lib/social/posts-context";
import { ScheduledPost } from "@/lib/social/mock-data";

function sameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfCalendarGrid(viewMonth: Date): Date {
  const y = viewMonth.getFullYear();
  const m = viewMonth.getMonth();
  const first = new Date(y, m, 1);
  const sunday0 = first.getDay();
  const mondayFirstCol = (sunday0 + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - mondayFirstCol);
  return start;
}

function postsForDay(posts: ScheduledPost[], day: Date): ScheduledPost[] {
  return posts.filter((p) => sameLocalDay(new Date(p.scheduledAt), day));
}

function countDots(posts: ScheduledPost[], day: Date): number {
  return postsForDay(posts, day).length;
}

export default function SocialCalendarPage() {
  const { posts } = usePosts();
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(12, 0, 0, 0);
    return d;
  });
  const [selected, setSelected] = useState<Date | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const label = viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const start = startOfCalendarGrid(viewMonth);
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    return Array.from({ length: 35 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        date,
        inMonth: date.getMonth() === m && date.getFullYear() === y,
        postCount: countDots(posts, date),
      };
    });
  }, [viewMonth, posts]);

  const selectedPosts = selected ? postsForDay(posts, selected) : [];

  const onSelectDay = useCallback((d: Date) => {
    setSelected(d);
    setPanelOpen(true);
  }, []);

  const shiftMonth = (delta: number) => {
    setViewMonth((prev) => {
      const n = new Date(prev);
      n.setMonth(prev.getMonth() + delta);
      return n;
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full">
      <p className="text-sm text-muted-foreground">
        Five-week grid (Mon–Sun). Dots show scheduled items for each day — click a day for details.
      </p>
      <CalendarToolbar
        label={label}
        onPrevMonth={() => shiftMonth(-1)}
        onNextMonth={() => shiftMonth(1)}
        onToday={() => {
          const d = new Date();
          d.setDate(1);
          d.setHours(12, 0, 0, 0);
          setViewMonth(d);
        }}
      />
      <CalendarGrid cells={cells} selected={selected} onSelectDay={onSelectDay} />
      <DayDetailPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        day={selected}
        posts={selectedPosts}
      />
    </div>
  );
}
