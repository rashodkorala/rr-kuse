"use client";

import { useRef } from "react";
import { Sparkles, Image as ImageIcon, Smile } from "lucide-react";
import { PlatformId } from "@/lib/social/platform-styles";
import { CharacterCounter } from "@/components/social/shared/CharacterCounter";

type Props = {
  content: string;
  onChange: (val: string) => void;
  activePlatform: PlatformId;
  onAdaptWithAI: () => void;
  isAdapting: boolean;
};

export function ComposerEditor({
  content,
  onChange,
  activePlatform,
  onAdaptWithAI,
  isAdapting,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <textarea
        ref={ref}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's happening at Rob Roy & Konfusion tonight?..."
        rows={6}
        className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-sm outline-none placeholder:text-muted-foreground"
      />
      <div className="flex items-center justify-between px-4 pb-3 pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <ImageIcon className="size-4" />
          </button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Smile className="size-4" />
          </button>
          <CharacterCounter text={content} platform={activePlatform} className="ml-2" />
        </div>
        <button
          onClick={onAdaptWithAI}
          disabled={isAdapting || !content.trim()}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Sparkles className="size-3.5" />
          {isAdapting ? "Adapting…" : "Adapt with AI"}
        </button>
      </div>
    </div>
  );
}
