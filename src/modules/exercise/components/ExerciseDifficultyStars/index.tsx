import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";
import { getRange } from "@/utils/getRange";
import { DIFF_META } from "../../exerciseTypes";
import { memo } from "react";

export const RANK_META: Record<
  number,
  {
    label: string;
    grade: string;
    from: string;
    to: string;
    ring: string;
    glow: string;
    text: string;
  }
> = {
  1: {
    label: "Muito fácil",
    grade: "D",
    from: "oklch(0.78 0.02 250)",
    to: "oklch(0.48 0.03 250)",
    ring: "oklch(0.85 0.03 250 / 0.55)",
    glow: "oklch(0.7 0.05 250 / 0.55)",
    text: "oklch(0.15 0.02 250)",
  },
  2: {
    label: "Fácil",
    grade: "C",
    from: "oklch(0.82 0.18 155)",
    to: "oklch(0.45 0.16 155)",
    ring: "oklch(0.85 0.2 155 / 0.6)",
    glow: "oklch(0.75 0.2 155 / 0.65)",
    text: "oklch(0.15 0.05 155)",
  },
  3: {
    label: "Médio",
    grade: "B",
    from: "oklch(0.82 0.16 235)",
    to: "oklch(0.45 0.2 260)",
    ring: "oklch(0.85 0.18 240 / 0.65)",
    glow: "oklch(0.7 0.22 255 / 0.7)",
    text: "oklch(0.98 0 0)",
  },
  4: {
    label: "Difícil",
    grade: "A",
    from: "oklch(0.78 0.22 320)",
    to: "oklch(0.4 0.24 300)",
    ring: "oklch(0.82 0.24 315 / 0.7)",
    glow: "oklch(0.65 0.28 310 / 0.75)",
    text: "oklch(0.98 0 0)",
  },
  5: {
    label: "Muito difícil",
    grade: "S",
    from: "oklch(0.92 0.17 90)",
    to: "oklch(0.62 0.2 55)",
    ring: "oklch(0.9 0.2 80 / 0.8)",
    glow: "oklch(0.85 0.22 75 / 0.9)",
    text: "oklch(0.2 0.05 60)",
  },
};

interface ExerciseDifficultyStarsProps {
  count: number;
  size?: number;
}

export const ExerciseDifficultyStars = memo(
  ({ count, size = 28 }: ExerciseDifficultyStarsProps) => {
    const diff = DIFF_META[count];
    const rank = RANK_META[count];

    const label = `Rank ${rank.grade} — ${rank.label}`;

    return (
      <Tooltip textContent={label} align="center">
        <span
          aria-label={label}
          className="relative inline-grid place-items-center font-black"
          style={{
            width: size,
            height: size,
            clipPath:
              "polygon(50% 0%, 100% 28%, 100% 72%, 50% 100%, 0% 72%, 0% 28%)",
            background: `linear-gradient(155deg, ${rank.from} 0%, ${rank.to} 100%)`,
            color: rank.text,
            fontSize: size * 0.5,
            lineHeight: 1,
            boxShadow: `0 0 14px -2px ${rank.glow}, inset 0 0 0 1px ${rank.ring}, inset 0 6px 10px -6px oklch(1 0 0 / 0.75), inset 0 -8px 12px -6px oklch(0 0 0 / 0.4)`,
            textShadow: "0 1px 0 oklch(1 0 0 / 0.3)",
          }}
        >
          {/* facet highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, oklch(1 0 0 / 0.35) 0%, oklch(1 0 0 / 0) 45%)",
              clipPath:
                "polygon(50% 0%, 100% 28%, 100% 50%, 50% 42%, 0% 50%, 0% 28%)",
            }}
          />
          <span className="relative">{rank.grade}</span>
        </span>
      </Tooltip>
    );
    return (
      <Tooltip textContent={`Dificuldade: ${diff.label}`} align="center">
        <span className="inline-flex items-center gap-0.5">
          {getRange(1, 5).map((i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i <= count ? cn(diff.tone, "fill-current") : "text-white/20",
              )}
            />
          ))}
        </span>
      </Tooltip>
    );
  },
);

ExerciseDifficultyStars.displayName = "ExerciseDifficultyStars";
