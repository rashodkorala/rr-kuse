"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
};

export function CalendarToolbar({ label, onPrevMonth, onNextMonth, onToday }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-lg font-semibold tracking-tight">{label}</h2>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <div className="flex rounded-md border border-border overflow-hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-none border-r border-border"
            onClick={onPrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-none"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
