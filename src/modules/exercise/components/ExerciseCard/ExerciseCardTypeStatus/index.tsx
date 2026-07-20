import { cn } from "@/utils/cn";
import { memo } from "react";
import { ExerciseDifficultyStars } from "../../ExerciseDifficultyStars";
import { DIFF_META, IExercise } from "@/modules/exercise/exerciseTypes";
import { SubmissionStatusBadge } from "@/modules/submission/components/SubmissionStatusBadge";

interface ExerciseCardTypeStatusProps {
  ex: IExercise;
}

export const ExerciseCardTypeStatus = memo(
  ({ ex }: ExerciseCardTypeStatusProps) => {
    const diff = DIFF_META[ex.difficulty || 1];

    return (
      <>
        {/* Name banner */}
        <div
          className={cn(
            "relative z-10 mt-2 rounded-lg card-name-banner",
            "px-2.5 py-1.5 text-center ring-1 ring-white/10",
          )}
        >
          <div className="flex items-center gap-2">
            <ExerciseDifficultyStars count={diff.stars} />
          </div>
        </div>

        {/* Type + status */}
        <div className="relative z-10 mt-2 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-tight text-white/60">
            [{ex?.category?.name || "N/A"}]
          </div>
          <SubmissionStatusBadge status={ex?.submissionStatus} />
        </div>
      </>
    );
  },
);

ExerciseCardTypeStatus.displayName = "ExerciseCardTypeStatus";
