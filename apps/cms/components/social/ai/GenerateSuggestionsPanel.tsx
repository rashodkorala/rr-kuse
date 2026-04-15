"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuggestionCard } from "@/components/social/ai/SuggestionFeed";
import { PlatformId, PLATFORM_IDS } from "@/lib/social/platform-styles";
import { cn } from "@/lib/utils";
import { usePosts } from "@/lib/social/posts-context";

type Tone = "professional" | "casual" | "playful" | "urgent";

type Props = {
  onSuggestions: (items: SuggestionCard[]) => void;
  onLoading: (v: boolean) => void;
};

let suggestionId = 0;

export function GenerateSuggestionsPanel({ onSuggestions, onLoading }: Props) {
  const { showToast } = usePosts();
  const [topic, setTopic] = useState("Weekend takeover at Konfusion");
  const [tone, setTone] = useState<Tone>("playful");

  const generate = async () => {
    onLoading(true);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "suggest", topic, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Suggest failed");

      const raw = Array.isArray(data.suggestions) ? data.suggestions : [];
      const cards: SuggestionCard[] = raw.map(
        (s: { caption: string; hashtags: string[]; tone: string; estimatedReach: number }) => ({
          id: `sg-${++suggestionId}`,
          topic,
          caption: s.caption,
          hashtags: s.hashtags ?? [],
          tone: s.tone ?? tone,
          estimatedReach: typeof s.estimatedReach === "number" ? s.estimatedReach : 5000,
          suggestedPlatforms: [...PLATFORM_IDS] as PlatformId[],
        })
      );
      onSuggestions(cards);
    } catch {
      showToast("Could not generate ideas. Check your connection or try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-5 text-violet-400" />
        <h3 className="text-sm font-semibold">Generate ideas</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        Claude returns three caption options for Rob Roy & Konfusion. Without an API key, mock JSON is used.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic or campaign angle"
          className="flex-1"
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className={cn(
            "h-9 rounded-md border border-input bg-transparent px-3 text-sm min-w-[140px]",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          )}
        >
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
          <option value="playful">Playful</option>
          <option value="urgent">Urgent</option>
        </select>
        <Button
          type="button"
          onClick={generate}
          disabled={!topic.trim()}
          className="gap-2 shrink-0 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
        >
          <Sparkles className="size-4" />
          Generate
        </Button>
      </div>
    </div>
  );
}
