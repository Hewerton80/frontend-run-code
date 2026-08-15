import { cn } from "@/utils/cn";
import { memo } from "react";
import { ExerciseDifficultyStars } from "../../ExerciseDifficultyStars";
import { DIFF_META } from "@/modules/exercise/exerciseTypes";
import { SubmissionStatusBadge } from "@/modules/submission/components/SubmissionStatusBadge";
import { Tooltip } from "@/components/ui/overlay/Tooltip/Tooltip";
import { ExerciseOfListDto } from "@/modules/list/hooks/useFetchListOfExercises";

interface ExerciseCardTypeStatusProps {
  ex: ExerciseOfListDto;
}

export const ExerciseCardTypeStatus = memo(
  ({ ex }: ExerciseCardTypeStatusProps) => {
    const diff = DIFF_META[ex.difficulty || 1];

    return (
      <div className="relative flex flex-col pb-2">
        <span className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <ExerciseDifficultyStars count={ex?.difficulty || 1} />
        </span>
        {/* Name banner */}
        <div
          className={cn(
            "relative z-10 mt-5 rounded-lg card-name-banner h-full",
            "px-2.5 py-1.5 text-center ring-1 ring-white/10",
          )}
        >
          <div className="flex items-center justify-center gap-2">
            {/* <ExerciseDifficultyStars count={diff.stars} /> */}
            <Tooltip textContent={ex.title} align="center">
              <span className="line-clamp-1 text-[13px] font-semibold tracking-tight text-white text-center">
                {ex.title}
              </span>
            </Tooltip>
          </div>
        </div>

        {/* Type + status */}
        <div className="relative z-10 mt-2 space-y-1.5">
          <div className="text-[10px] font-semibold uppercase tracking-tight text-white/60">
            [{ex?.category?.name || "N/A"}]
          </div>
          <SubmissionStatusBadge status={ex?.submissionStatus} />
        </div>
      </div>
    );
  },
);

ExerciseCardTypeStatus.displayName = "ExerciseCardTypeStatus";
