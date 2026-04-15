"use client";

import { PlatformId, PLATFORM_STYLES, PLATFORM_IDS } from "@/lib/social/platform-styles";
import { PlatformIcon } from "@/components/social/shared/PlatformIcon";
import { cn } from "@/lib/utils";

type Props = {
  selected: PlatformId[];
  onChange: (platforms: PlatformId[]) => void;
};

export function PlatformToggleBar({ selected, onChange }: Props) {
  const toggle = (id: PlatformId) => {
    if (selected.includes(id)) {
      if (selected.length <= 1) return;
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground mr-1">Post to:</span>
      {PLATFORM_IDS.map((id) => {
        const active = selected.includes(id);
        const style = PLATFORM_STYLES[id];
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all",
              active
                ? "border-transparent text-white"
                : "border-border bg-transparent text-muted-foreground hover:text-foreground"
            )}
            style={active ? { backgroundColor: style.color } : undefined}
            title={style.name}
          >
            <PlatformIcon platform={id} size={13} />
            <span>{style.name}</span>
          </button>
        );
      })}
    </div>
  );
}
