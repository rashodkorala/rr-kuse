"use client";

import { useState } from "react";
import { GenerateSuggestionsPanel } from "@/components/social/ai/GenerateSuggestionsPanel";
import { SuggestionFeed, SuggestionCard } from "@/components/social/ai/SuggestionFeed";
import { AILoadingState } from "@/components/social/ai/AILoadingState";
import { MOCK_AI_SUGGESTIONS } from "@/lib/social/mock-data";
import { usePosts } from "@/lib/social/posts-context";

function mapMockToCards(): SuggestionCard[] {
  return MOCK_AI_SUGGESTIONS.map((m) => ({
    id: m.id,
    topic: m.topic,
    caption: m.caption,
    hashtags: m.hashtags,
    tone: m.tone,
    estimatedReach: m.estimatedReach,
    suggestedPlatforms: m.suggestedPlatforms,
  }));
}

export default function SocialAiSuggestionsPage() {
  const { showToast } = usePosts();
  const [items, setItems] = useState<SuggestionCard[]>(() => mapMockToCards());
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <p className="text-sm text-muted-foreground">
        Brainstorm with Claude, then send a card to the composer. Seed cards load from mock data; Generate replaces the feed.
      </p>
      <GenerateSuggestionsPanel
        onSuggestions={(next) => {
          setItems(next);
          if (next.length) showToast(`Generated ${next.length} new ideas.`);
        }}
        onLoading={setLoading}
      />
      {loading ? <AILoadingState /> : <SuggestionFeed items={items} />}
    </div>
  );
}
