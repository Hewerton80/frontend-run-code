import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Star } from "lucide-react";
import { cn } from "@/utils/cn";
import { getRange } from "@/utils/getRange";
import { DIFF_META } from "../../exerciseTypes";
import { memo } from "react";

interface ExerciseDifficultyStarsProps {
  count: number;
}

export const ExerciseDifficultyStars = memo(
  ({ count }: ExerciseDifficultyStarsProps) => {
    const diff = DIFF_META[count];

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
