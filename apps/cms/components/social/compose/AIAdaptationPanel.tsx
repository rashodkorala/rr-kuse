"use client";

import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { PlatformId, PLATFORM_STYLES } from "@/lib/social/platform-styles";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { CharacterCounter } from "@/components/social/shared/CharacterCounter";

type Props = {
  adapted: Partial<Record<PlatformId, string>>;
  onApply: (platform: PlatformId, text: string) => void;
  isLoading: boolean;
};

export function AIAdaptationPanel({ adapted, onApply, isLoading }: Props) {
  const [copied, setCopied] = useState<PlatformId | null>(null);

  const copy = (platform: PlatformId, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(platform);
    setTimeout(() => setCopied(null), 1500);
  };

  const entries = Object.entries(adapted) as [PlatformId, string][];

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center gap-3">
        <div className="size-8 rounded-full bg-violet-500/20 flex items-center justify-center animate-pulse">
          <Sparkles className="size-4 text-violet-400" />
        </div>
        <p className="text-sm text-muted-foreground">Claude is adapting your content…</p>
        <div className="w-full space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 flex flex-col items-center gap-2 text-center">
        <Sparkles className="size-8 text-muted-foreground/40" />
        <p className="text-sm font-medium">AI Platform Adaptations</p>
        <p className="text-xs text-muted-foreground">
          Write your content above and click &quot;Adapt with AI&quot; to generate platform-optimised versions.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-violet-500/5">
        <Sparkles className="size-4 text-violet-400" />
        <span className="text-sm font-semibold">AI-Adapted Versions</span>
      </div>
      <div className="divide-y divide-border">
        {entries.map(([platform, text]) => (
          <div key={platform} className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={platform} size={14} />
                <span className="text-xs font-semibold">{PLATFORM_STYLES[platform].name}</span>
                <CharacterCounter text={text} platform={platform} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copy(platform, text)}
                  className="p-1.5 rounded text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copied === platform ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
                <button
                  onClick={() => onApply(platform, text)}
                  className="rounded px-2.5 py-1 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Use
                </button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed line-clamp-4">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
