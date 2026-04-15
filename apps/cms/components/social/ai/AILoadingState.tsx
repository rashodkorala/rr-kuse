"use client";

import { Sparkles } from "lucide-react";

export function AILoadingState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 flex flex-col items-center gap-3 text-center">
      <div className="size-12 rounded-full bg-violet-500/15 flex items-center justify-center animate-pulse">
        <Sparkles className="size-6 text-violet-400" />
      </div>
      <p className="text-sm font-medium">Generating ideas…</p>
      <p className="text-xs text-muted-foreground max-w-sm">
        Claude is drafting captions and hashtags. If no API key is set, you will still see realistic mock suggestions.
      </p>
    </div>
  );
}
