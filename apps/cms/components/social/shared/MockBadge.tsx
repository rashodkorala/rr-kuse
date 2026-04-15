import { cn } from "@/lib/utils";

export function MockBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-yellow-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-yellow-400 ring-1 ring-yellow-400/30",
        className
      )}
    >
      DEMO
    </span>
  );
}
