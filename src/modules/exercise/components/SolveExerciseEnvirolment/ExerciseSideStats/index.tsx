import { FetchExerciseByUuIdResponse } from "@/modules/exercise/hooks/useFetchExerciseByUuId";
import { cn } from "@/utils/cn";
import { memo, useMemo } from "react";
import {
  ExerciseDifficultyStars,
  RANK_META,
} from "../../ExerciseDifficultyStars";

import { Rocket, Target, Trophy, Users, Zap } from "lucide-react";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { XP_BY_DIFFICULTY } from "@/modules/submission/types/XpByDifficultyRecord";

interface ExerciseSideStatsProps {
  exercise?: FetchExerciseByUuIdResponse;
}

export const ExerciseSideStats = memo(
  ({ exercise }: ExerciseSideStatsProps) => {
    const wasAlreadyAccepted = useMemo(
      () => exercise?.submissionStats?.wasAlreadyAccepted,
      [exercise?.submissionStats?.wasAlreadyAccepted],
    );

    if (!exercise) return null;

    return (
      <aside
        className={cn(
          "relative flex flex-col rounded-4xl p-5 h-fit",
          "border border-white/10 gap-3 card-frame-gray",
        )}
      >
        <div className="flex items-center gap-3">
          <ExerciseDifficultyStars
            size={44}
            count={exercise?.difficulty || 1}
          />
          <div className="flex flex-col">
            <p className="text-sm font-black text-foreground">
              Rank {RANK_META[exercise?.difficulty || 1].grade}
            </p>
            <span className="truncate text-xs text-muted-foreground">
              {RANK_META[exercise?.difficulty || 1].label}
            </span>
          </div>
        </div>
        {wasAlreadyAccepted && (
          <div
            className={cn(
              "flex items-center justify-between rounded-xl border border-warning/30",
              "bg-warning/10 px-3 py-2",
            )}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider",
                "text-warning",
              )}
            >
              <Trophy className="size-4 text-warning" />
              Conquistado
            </span>
          </div>
        )}

        <div
          className={cn(
            "flex items-center justify-between rounded-xl border border-primary/30",
            "bg-primary/10 px-3 py-2 gap-4",
          )}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider",
              "text-muted-foreground",
            )}
          >
            <Zap className="size-4 text-primary" />
            Recompensa
          </span>
          <span
            className={cn(
              "text-sm font-black text-primary",
              wasAlreadyAccepted && "line-through",
            )}
          >
            +{XP_BY_DIFFICULTY[exercise?.difficulty || 1]} XP
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex min-w-0 items-center gap-2 text-muted-foreground">
            <Rocket className="size-4 text-primary" />
            <span className="truncate">Submissões</span>
          </span>
          <dd className="font-bold tabular-nums text-foreground">
            {exercise?.submissionsCount || 0}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex min-w-0 items-center gap-2 text-muted-foreground">
            <Users className="size-4 text-primary" />
            <span className="truncate">Acertaram</span>
          </span>
          <dd className="font-bold tabular-nums text-foreground">
            {exercise?.solvedSubmissionsCount || 0}
          </dd>
        </div>

        {exercise?.submissionsCount > 0 && (
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="inline-flex min-w-0 items-center gap-2 text-muted-foreground">
              <Target className="size-4 text-primary" />
              <span className="truncate">Taxa de acerto</span>
            </span>
            <dd className="font-bold tabular-nums text-foreground">
              {exercise?.submissionsCount
                ? (
                    exercise?.solvedSubmissionsCount /
                    exercise?.submissionsCount
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                  })
                : "0%"}
            </dd>
          </div>
        )}

        <div className="flex flex-col gap-1.5 pt-6">
          <span className="text-sm font-bold text-muted-foreground">
            Autor(a)
          </span>
          <GroupedUserInfo
            user={{
              email: exercise?.author?.email,
              name: exercise?.author?.name,
              surname: exercise?.author?.surname,
              avatarBgColor: exercise?.author?.avatarBgColor,
              avatarUrl: exercise?.author?.avatarUrl,
            }}
          />
        </div>
      </aside>
    );
  },
);

ExerciseSideStats.displayName = "ExerciseSideStats";
