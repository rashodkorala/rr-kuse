"use client";

import { Platform } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Image as ImageIcon, TrendingUp } from "lucide-react";

type Props = {
  platform: Platform;
  onToggleConnect: () => void;
};

export function PlatformCard({ platform, onToggleConnect }: Props) {
  const { id, name, handle, connected, followers, following, postCount, avgEngagement, lastSync } =
    platform;

  const synced = new Date(lastSync).toLocaleString("en-GB", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <div
        className="h-2 w-full"
        style={{ backgroundColor: platform.color }}
        aria-hidden
      />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="size-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${platform.color}22` }}
            >
              <PlatformIcon platform={id} size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{name}</h3>
              <p className="text-xs text-muted-foreground truncate">{handle}</p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            variant={connected ? "outline" : "default"}
            onClick={onToggleConnect}
            className="shrink-0"
          >
            {connected ? "Disconnect" : "Connect"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-muted/40 px-3 py-2 flex items-center gap-2">
            <Users className="size-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Followers</p>
              <p className="font-medium tabular-nums">{followers.toLocaleString()}</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/40 px-3 py-2 flex items-center gap-2">
            <UserPlus className="size-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Following</p>
              <p className="font-medium tabular-nums">{following.toLocaleString()}</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/40 px-3 py-2 flex items-center gap-2">
            <ImageIcon className="size-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Posts</p>
              <p className="font-medium tabular-nums">{postCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/40 px-3 py-2 flex items-center gap-2">
            <TrendingUp className="size-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Avg engagement</p>
              <p className="font-medium tabular-nums">{avgEngagement.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-auto">
          Last sync: {synced} ·{" "}
          <span className={connected ? "text-emerald-500" : "text-amber-500"}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </p>
      </div>
    </div>
  );
}
