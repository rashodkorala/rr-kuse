"use client";

import { useState } from "react";
import { MOCK_PLATFORMS, Platform } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { CheckCircle2, XCircle } from "lucide-react";

export function PlatformHealthRow() {
  const [platforms, setPlatforms] = useState<Platform[]>(MOCK_PLATFORMS);

  const toggle = (id: string) =>
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p))
    );

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold mb-4">Platform Status</h3>
      <div className="flex flex-wrap gap-3">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => toggle(p.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors cursor-pointer ${
              p.connected
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                : "border-border bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <PlatformIcon platform={p.id} size={14} />
            <span>{p.name}</span>
            {p.connected ? (
              <CheckCircle2 className="size-3.5 text-emerald-500" />
            ) : (
              <XCircle className="size-3.5 text-red-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
