import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { cn } from "@/utils/cn";

interface ExerciseXPGemProps {
  xp: number;
  done?: boolean;
  size?: number;
}

export const ExerciseXPGem = ({ xp, done, size = 32 }: ExerciseXPGemProps) => {
  const wrapperSize = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
  return (
    <Tooltip textContent={`+${xp} XP`} align="center">
      <div
        className="relative inline-grid place-items-center"
        style={{ width: wrapperSize, height: wrapperSize }}
      >
        <span
          className={cn(
            "absolute inset-0 inline-grid place-items-center rounded-md z-10",
            "shadow-[0_0_12px_-2px_oklch(0.62_0.22_275/0.7)] ring-1",
            "ring-white/25 size-full",
          )}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.7 0.2 275) 0%, oklch(0.5 0.22 265) 100%)",
            transform: `rotate(45deg) translate(${size / 4}px, 0)`,
            width: size,
            height: size,
          }}
          aria-label={`${xp} XP`}
        />
        <span
          className={cn(
            "font-black text-white z-20 tabular-nums",
            done && "line-through",
          )}
          style={{ fontSize: size * 0.35 }}
        >
          {xp}
        </span>
      </div>
    </Tooltip>
  );
};

ExerciseXPGem.displayName = "ExerciseXPGem";
