"use client";

import { useRouter } from "next/navigation";
import { PlatformId } from "@/lib/social/platform-styles";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { Button } from "@/components/ui/button";
import { MockBadge } from "@/components/social/shared/MockBadge";

export type SuggestionCard = {
  id: string;
  topic?: string;
  caption: string;
  hashtags: string[];
  tone: string;
  estimatedReach: number;
  suggestedPlatforms?: PlatformId[];
};

type Props = {
  items: SuggestionCard[];
};

const toneClass: Record<string, string> = {
  professional: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  casual: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  playful: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  urgent: "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export function SuggestionFeed({ items }: Props) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
        Generate ideas to fill this board. Cards open the composer with your caption pre-filled.
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 gap-4 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="break-inside-avoid rounded-xl border border-border bg-card p-4 flex flex-col gap-3 shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <MockBadge />
              <span
                className={`text-[10px] uppercase tracking-wide font-semibold rounded-full border px-2 py-0.5 ${toneClass[item.tone] ?? "bg-muted text-muted-foreground border-border"}`}
              >
                {item.tone}
              </span>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
              ~{item.estimatedReach.toLocaleString()} reach
            </span>
          </div>
          {item.topic && (
            <p className="text-xs font-semibold text-primary/90">{item.topic}</p>
          )}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{item.caption}</p>
          <p className="text-xs text-muted-foreground">
            {item.hashtags.map((h) => (
              <span key={h} className="mr-1.5">
                {h}
              </span>
            ))}
          </p>
          {item.suggestedPlatforms && item.suggestedPlatforms.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {item.suggestedPlatforms.map((p) => (
                <PlatformIcon key={p} platform={p} size={12} className="text-muted-foreground" />
              ))}
              <span className="text-[10px] text-muted-foreground ml-1">suggested</span>
            </div>
          )}
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full mt-1"
            onClick={() => {
              const q = encodeURIComponent(item.caption);
              router.push(`/social/compose?prefill=${q}`);
            }}
          >
            Use this
          </Button>
        </div>
      ))}
    </div>
  );
}
