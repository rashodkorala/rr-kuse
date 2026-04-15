"use client";

import { StatsGrid } from "@/components/social/dashboard/StatsGrid";
import { PlatformHealthRow } from "@/components/social/dashboard/PlatformHealthRow";
import { ScheduledPostsPreview } from "@/components/social/dashboard/ScheduledPostsPreview";
import { RecentActivityFeed } from "@/components/social/dashboard/RecentActivityFeed";

export default function SocialDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Overview of reach, scheduling, and platform health — demo data.
        </p>
      </div>
      <StatsGrid />
      <PlatformHealthRow />
      <div className="grid gap-6 lg:grid-cols-2">
        <ScheduledPostsPreview />
        <RecentActivityFeed />
      </div>
    </div>
  );
}
