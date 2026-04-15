"use client";

import { useState } from "react";
import { MOCK_PLATFORMS, Platform } from "@/lib/social/mock-data";
import { PlatformCard } from "@/components/social/platforms/PlatformCard";
import { PlatformStatsBar } from "@/components/social/platforms/PlatformStatsBar";

export default function SocialPlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>(MOCK_PLATFORMS);

  const toggle = (id: string) =>
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p))
    );

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <p className="text-sm text-muted-foreground">
        Mock connections — toggle Connect / Disconnect to update status for screenshots.
      </p>
      <PlatformStatsBar platforms={platforms} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {platforms.map((p) => (
          <PlatformCard key={p.id} platform={p} onToggleConnect={() => toggle(p.id)} />
        ))}
      </div>
    </div>
  );
}
