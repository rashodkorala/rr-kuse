"use client";

import { PlatformId, PLATFORM_STYLES } from "@/lib/social/platform-styles";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { MockBadge } from "@/components/social/shared/MockBadge";

type Props = {
  content: string;
  overrides: Partial<Record<PlatformId, string>>;
  activePlatform: PlatformId;
  onSelectPlatform: (p: PlatformId) => void;
  selectedPlatforms: PlatformId[];
};

// ── Per-platform preview renderers ──────────────────────────────────────────

function TwitterPreview({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black p-4 max-w-sm mx-auto">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-full bg-zinc-700 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">Rob Roy & Konfusion</span>
            <span className="text-xs text-zinc-500">@robroy_konfusion · now</span>
          </div>
          <p className="mt-1 text-sm text-white leading-relaxed whitespace-pre-wrap">{text || "Start typing your post…"}</p>
          <div className="mt-3 flex items-center gap-6 text-zinc-500 text-xs">
            <span>💬 4</span>
            <span>🔁 12</span>
            <span>❤️ 48</span>
            <span>📊</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramPreview({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 max-w-sm mx-auto overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shrink-0" />
        <span className="text-sm font-semibold text-white">robroykonfusion</span>
        <span className="ml-auto text-zinc-500 text-lg">···</span>
      </div>
      <div className="aspect-square bg-gradient-to-br from-purple-900/60 via-zinc-800 to-zinc-900 flex items-center justify-center">
        <span className="text-zinc-600 text-sm">Photo / Video</span>
      </div>
      <div className="p-3">
        <div className="flex gap-4 text-zinc-400 mb-2 text-xl">
          <span>♡</span><span>💬</span><span>📤</span>
          <span className="ml-auto">🔖</span>
        </div>
        <p className="text-xs text-white">
          <span className="font-semibold">robroykonfusion</span>{" "}
          <span className="whitespace-pre-wrap">{text || "Start typing…"}</span>
        </p>
      </div>
    </div>
  );
}

function LinkedInPreview({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">RK</div>
        <div>
          <p className="text-sm font-semibold text-white">Rob Roy & Konfusion</p>
          <p className="text-xs text-zinc-400">Edinburgh Nightclub · 2.3K followers</p>
          <p className="text-xs text-zinc-500">Now • 🌐</p>
        </div>
      </div>
      <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
        {text || "Start typing your post…"}
      </p>
      <div className="mt-4 pt-3 border-t border-zinc-700 flex gap-4 text-xs text-zinc-400">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔁 Repost</span>
        <span>📤 Send</span>
      </div>
    </div>
  );
}

function FacebookPreview({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 max-w-sm mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">RK</div>
        <div>
          <p className="text-sm font-semibold text-white">Rob Roy & Konfusion</p>
          <p className="text-xs text-zinc-400">Just now · 🌐</p>
        </div>
        <span className="ml-auto text-zinc-500 text-lg">···</span>
      </div>
      <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
        {text || "Start typing your post…"}
      </p>
      <div className="mt-4 pt-3 border-t border-zinc-700 flex gap-4 text-xs text-zinc-400">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>↗️ Share</span>
      </div>
    </div>
  );
}

function TikTokPreview({ text }: { text: string }) {
  return (
    <div className="mx-auto w-40 rounded-3xl border-4 border-zinc-700 bg-black overflow-hidden aspect-[9/16] relative flex flex-col justify-end">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-zinc-900 to-black" />
      <div className="relative z-10 p-3">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <p className="text-xs font-semibold text-white mb-1">@robroykonfusion</p>
            <p className="text-[10px] text-zinc-300 line-clamp-3 whitespace-pre-wrap">
              {text || "Start typing…"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="flex flex-col items-center"><span className="text-lg">❤️</span><span className="text-[9px]">48K</span></div>
            <div className="flex flex-col items-center"><span className="text-lg">💬</span><span className="text-[9px]">1.2K</span></div>
            <div className="flex flex-col items-center"><span className="text-lg">🔁</span><span className="text-[9px]">4K</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const previewMap: Record<PlatformId, React.FC<{ text: string }>> = {
  twitter: TwitterPreview,
  instagram: InstagramPreview,
  linkedin: LinkedInPreview,
  facebook: FacebookPreview,
  tiktok: TikTokPreview,
};

export function PlatformPreviewPanel({
  content,
  overrides,
  activePlatform,
  onSelectPlatform,
  selectedPlatforms,
}: Props) {
  const Preview = previewMap[activePlatform];
  const text = overrides[activePlatform] ?? content;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border overflow-x-auto">
        {selectedPlatforms.map((p) => (
          <button
            key={p}
            onClick={() => onSelectPlatform(p)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activePlatform === p
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PlatformIcon platform={p} size={13} />
            {PLATFORM_STYLES[p].name}
          </button>
        ))}
      </div>

      {/* Preview content */}
      <div className="p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Preview</span>
          <MockBadge />
        </div>
        <Preview text={text} />
      </div>
    </div>
  );
}
