"use client";

import { useMemo, useState } from "react";
import { MOCK_PUBLISHED_POSTS, PublishedPost } from "@/lib/social/mock-data";
import { PlatformId, PLATFORM_STYLES, PLATFORM_IDS } from "@/lib/social/platform-styles";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { PostDetailModal } from "@/components/social/history/PostDetailModal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PostHistoryTable() {
  const [platform, setPlatform] = useState<PlatformId | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PublishedPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const rows = useMemo(() => {
    return MOCK_PUBLISHED_POSTS.filter((p) => {
      if (platform !== "all" && p.platform !== platform) return false;
      if (!query.trim()) return true;
      return p.content.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 80);
  }, [platform, query]);

  const openRow = (post: PublishedPost) => {
    setSelected(post);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <Input
          placeholder="Search caption…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="platform-filter" className="text-xs text-muted-foreground shrink-0">
            Platform
          </label>
          <select
            id="platform-filter"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformId | "all")}
            className={cn(
              "h-9 rounded-md border border-input bg-transparent px-3 text-sm min-w-[160px]",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            )}
          >
            <option value="all">All platforms</option>
            {PLATFORM_IDS.map((id) => (
              <option key={id} value={id}>
                {PLATFORM_STYLES[id].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Platform</th>
                <th className="px-4 py-3 font-medium">Content</th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">Published</th>
                <th className="px-4 py-3 font-medium text-right">Reach</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border/60 hover:bg-muted/20 cursor-pointer transition-colors"
                  onClick={() => openRow(post)}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <PlatformIcon platform={post.platform} size={14} />
                      <span className="text-muted-foreground">
                        {PLATFORM_STYLES[post.platform].name}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-md truncate">{post.content}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap tabular-nums">
                    {new Date(post.publishedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {post.stats.reach.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground text-center">No posts match your filters.</p>
        )}
      </div>

      {selected ? (
        <PostDetailModal
          post={selected}
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
            if (!open) setSelected(null);
          }}
        />
      ) : null}
    </div>
  );
}
