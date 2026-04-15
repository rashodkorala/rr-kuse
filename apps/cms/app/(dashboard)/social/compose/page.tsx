"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { ComposerEditor } from "@/components/social/compose/ComposerEditor";
import { PlatformToggleBar } from "@/components/social/compose/PlatformToggleBar";
import { PlatformPreviewPanel } from "@/components/social/compose/PlatformPreviewPanel";
import { AIAdaptationPanel } from "@/components/social/compose/AIAdaptationPanel";
import { ScheduleModal } from "@/components/social/compose/ScheduleModal";
import { Button } from "@/components/ui/button";
import { PlatformId, PLATFORM_IDS } from "@/lib/social/platform-styles";
import { usePosts } from "@/lib/social/posts-context";

function SocialComposePageInner() {
  const searchParams = useSearchParams();
  const { addPost, showToast } = usePosts();

  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformId[]>([...PLATFORM_IDS]);
  const [activePlatform, setActivePlatform] = useState<PlatformId>("twitter");
  const [overrides, setOverrides] = useState<Partial<Record<PlatformId, string>>>({});
  const [adapted, setAdapted] = useState<Partial<Record<PlatformId, string>>>({});
  const [isAdapting, setIsAdapting] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleKey, setScheduleKey] = useState(0);

  useEffect(() => {
    const prefill = searchParams.get("prefill");
    if (prefill) setContent(decodeURIComponent(prefill));
  }, [searchParams]);

  useEffect(() => {
    if (!selectedPlatforms.includes(activePlatform)) {
      setActivePlatform(selectedPlatforms[0] ?? "twitter");
    }
  }, [selectedPlatforms, activePlatform]);

  const adaptWithAI = useCallback(async () => {
    if (!content.trim()) return;
    setIsAdapting(true);
    setAdapted({});
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "adapt",
          content,
          platforms: selectedPlatforms,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Adapt failed");
      const next: Partial<Record<PlatformId, string>> = {};
      for (const p of selectedPlatforms) {
        const v = data.adapted?.[p];
        if (typeof v === "string") next[p] = v;
      }
      setAdapted(next);
      showToast("AI adaptations ready for your selected platforms.");
    } catch {
      showToast("Could not adapt content. Using offline fallback if available.");
    } finally {
      setIsAdapting(false);
    }
  }, [content, selectedPlatforms, showToast]);

  const applyAdaptation = useCallback((platform: PlatformId, text: string) => {
    setOverrides((o) => ({ ...o, [platform]: text }));
    setActivePlatform(platform);
    showToast(`Applied AI text to ${platform} preview.`);
  }, [showToast]);

  const canSchedule = useMemo(
    () => content.trim().length > 0 && selectedPlatforms.length > 0,
    [content, selectedPlatforms.length]
  );

  const handleScheduled = useCallback(
    (isoUtc: string) => {
      addPost({
        content: content.trim(),
        scheduledAt: isoUtc,
        platforms: selectedPlatforms,
        platformOverrides: overrides,
      });
      showToast("Post scheduled. Check the calendar and dashboard.");
    },
    [addPost, content, overrides, selectedPlatforms, showToast]
  );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Write once, preview per platform, adapt with Claude, then schedule (session-only).
        </p>
        <Button
          type="button"
          variant="secondary"
          className="shrink-0 gap-2"
          disabled={!canSchedule}
          onClick={() => {
            setScheduleKey((k) => k + 1);
            setScheduleOpen(true);
          }}
        >
          <CalendarClock className="size-4" />
          Schedule
        </Button>
      </div>

      <ComposerEditor
        content={content}
        onChange={setContent}
        activePlatform={activePlatform}
        onAdaptWithAI={adaptWithAI}
        isAdapting={isAdapting}
      />

      <PlatformToggleBar selected={selectedPlatforms} onChange={setSelectedPlatforms} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PlatformPreviewPanel
          content={content}
          overrides={overrides}
          activePlatform={activePlatform}
          onSelectPlatform={setActivePlatform}
          selectedPlatforms={selectedPlatforms}
        />
        <AIAdaptationPanel
          adapted={adapted}
          onApply={applyAdaptation}
          isLoading={isAdapting}
        />
      </div>

      <ScheduleModal
        key={scheduleKey}
        open={scheduleOpen}
        onOpenChange={setScheduleOpen}
        onConfirm={handleScheduled}
      />
    </div>
  );
}

export default function SocialComposePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
          Loading composer…
        </div>
      }
    >
      <SocialComposePageInner />
    </Suspense>
  );
}
