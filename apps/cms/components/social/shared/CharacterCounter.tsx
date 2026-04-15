import { PlatformId, PLATFORM_STYLES } from "@/lib/social/platform-styles";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  platform: PlatformId;
  className?: string;
};

export function CharacterCounter({ text, platform, className }: Props) {
  const limit = PLATFORM_STYLES[platform].charLimit;
  const count = text.length;
  const remaining = limit - count;
  const pct = count / limit;

  const color =
    pct >= 1
      ? "text-red-500"
      : pct >= 0.9
      ? "text-orange-400"
      : "text-muted-foreground";

  return (
    <span className={cn("text-xs tabular-nums", color, className)}>
      {limit > 10000 ? `${count} chars` : `${remaining} left`}
    </span>
  );
}
