"use client";

import { Platform } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";

type Props = {
  platforms: Platform[];
};

export function PlatformStatsBar({ platforms }: Props) {
  const totalFollowers = platforms.reduce((s, p) => s + p.followers, 0);
  const connected = platforms.filter((p) => p.connected).length;
  const avgEng =
    platforms.length === 0
      ? 0
      : platforms.reduce((s, p) => s + p.avgEngagement, 0) / platforms.length;

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Network (demo)</p>
          <p className="text-2xl font-bold tabular-nums">{totalFollowers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">combined followers</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">
            {connected}/{platforms.length} connected
          </p>
          <p className="text-xs text-muted-foreground">
            Avg engagement {avgEng.toFixed(1)}%
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs"
            title={p.name}
          >
            <PlatformIcon platform={p.id} size={12} />
            <span className="tabular-nums text-muted-foreground">
              {(p.followers / 1000).toFixed(1)}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
