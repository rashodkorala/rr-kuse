"use client";

import { Dialog } from "radix-ui";
import { PublishedPost } from "@/lib/social/mock-data";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { PLATFORM_STYLES } from "@/lib/social/platform-styles";
import { cn } from "@/lib/utils";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";

type Props = {
  post: PublishedPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PostDetailModal({ post, open, onOpenChange }: Props) {
  if (!post) return null;

  const { platform, content, publishedAt, stats } = post;
  const when = new Date(publishedAt).toLocaleString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
          )}
        />
        <Dialog.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg outline-none duration-200 max-h-[90vh] overflow-y-auto"
          )}
        >
          <div className="flex items-center gap-2 mb-1">
            <PlatformIcon platform={platform} size={18} />
            <Dialog.Title className="text-base font-semibold">
              {PLATFORM_STYLES[platform].name}
            </Dialog.Title>
          </div>
          <Dialog.Description className="text-xs text-muted-foreground mb-4">
            Published {when} · demo metrics
          </Dialog.Description>
          <p className="text-sm leading-relaxed whitespace-pre-wrap mb-6">{content}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2 flex items-center gap-2">
              <Eye className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Reach</p>
                <p className="font-semibold tabular-nums">{stats.reach.toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2 flex items-center gap-2">
              <Heart className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Likes</p>
                <p className="font-semibold tabular-nums">{stats.likes.toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2 flex items-center gap-2">
              <MessageCircle className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Comments</p>
                <p className="font-semibold tabular-nums">{stats.comments.toLocaleString()}</p>
              </div>
            </div>
            <div className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2 flex items-center gap-2">
              <Share2 className="size-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Shares</p>
                <p className="font-semibold tabular-nums">{stats.shares.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
