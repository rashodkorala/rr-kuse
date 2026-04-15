import type { ReactNode } from "react";
import { MOCK_ACTIVITY, ActivityItem } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { CheckCircle2, Clock, XCircle, Sparkles, Link2 } from "lucide-react";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const typeIcon: Record<ActivityItem["type"], ReactNode> = {
  published: <CheckCircle2 className="size-4 text-emerald-500" />,
  scheduled: <Clock className="size-4 text-blue-400" />,
  failed: <XCircle className="size-4 text-red-400" />,
  connected: <Link2 className="size-4 text-purple-400" />,
  ai_generated: <Sparkles className="size-4 text-yellow-400" />,
};

export function RecentActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
      <h3 className="text-sm font-semibold">Recent Activity</h3>
      <div className="flex flex-col gap-2">
        {MOCK_ACTIVITY.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-1.5">
            <span className="shrink-0">{typeIcon[item.type]}</span>
            {item.platform && (
              <PlatformIcon
                platform={item.platform}
                size={12}
                className="text-muted-foreground shrink-0"
              />
            )}
            <span className="text-sm flex-1">{item.message}</span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timeAgo(item.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
