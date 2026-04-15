"use client";

import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type DayCell = {
  date: Date;
  inMonth: boolean;
  postCount: number;
};

type Props = {
  cells: DayCell[];
  selected: Date | null;
  onSelectDay: (d: Date) => void;
};

/** Pure CSS grid: 7 columns × 5 rows of day cells (35 slots). Trailing days may spill visually via scroll if needed. */
export function CalendarGrid({ cells, selected, onSelectDay }: Props) {
  const rows = cells.slice(0, 35);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border bg-muted/30 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 border-r border-border/50 last:border-r-0">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 min-h-[280px]">
        {rows.map((cell, i) => {
          const isSel =
            selected &&
            cell.date.getFullYear() === selected.getFullYear() &&
            cell.date.getMonth() === selected.getMonth() &&
            cell.date.getDate() === selected.getDate();

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelectDay(cell.date)}
              className={cn(
                "relative flex flex-col items-center justify-start pt-2 pb-3 border-r border-b border-border/50 text-sm transition-colors hover:bg-muted/40 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                (i + 1) % 7 === 0 && "border-r-0",
                !cell.inMonth && "text-muted-foreground/50 bg-muted/10",
                isSel && "bg-primary/15 ring-1 ring-inset ring-primary/40"
              )}
            >
              <span className={cn("font-medium tabular-nums", isSel && "text-primary")}>
                {cell.date.getDate()}
              </span>
              {cell.postCount > 0 && (
                <span className="mt-1 flex flex-wrap justify-center gap-0.5 max-w-[90%]">
                  {Array.from({ length: Math.min(cell.postCount, 4) }).map((_, j) => (
                    <span
                      key={j}
                      className="size-1.5 rounded-full bg-violet-500 shadow-sm"
                      aria-hidden
                    />
                  ))}
                  {cell.postCount > 4 && (
                    <span className="text-[9px] text-muted-foreground leading-none">+</span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
