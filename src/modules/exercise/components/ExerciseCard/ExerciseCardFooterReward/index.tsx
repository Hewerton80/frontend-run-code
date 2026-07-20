import { cn } from "@/utils/cn";
import { Trophy, Zap } from "lucide-react";
import { memo } from "react";

interface ExerciseCardFooterRewardProps {
  xp: number;
  done: boolean;
}

export const ExerciseCardFooterReward = memo(
  ({ done, xp }: ExerciseCardFooterRewardProps) => {
    return (
      <div className="relative z-10 mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-[11px]">
        <span
          className={cn(
            "inline-flex items-center gap-1 font-bold text-primary",
            done && "line-through",
          )}
        >
          <Zap className="size-3" /> +{xp} XP
        </span>
        {done && (
          <span className="inline-flex items-center gap-1 font-bold text-warning/90">
            <Trophy className="size-3" /> Conquistado
          </span>
        )}
      </div>
    );
  },
);
ExerciseCardFooterReward.displayName = "ExerciseCardFooterReward";
