import { memo, useMemo } from "react";
import { useGetCachedExerciseOfList } from "../../hooks/useGetCachedExerciseOfList";
import {
  SubmissionStatus,
  XP_BY_DIFFICULTY,
} from "@/modules/submission/submissionType";
import { ExerciseCardWrapper } from "./ExerciseCardWrapper";
import { ExerciseCardTopBar } from "./ExerciseCardTopBar";
import { ExerciseCardArtWindow } from "./ExerciseCardArtWindow";
import { ExerciseCardTypeStatus } from "./ExerciseCardTypeStatus";
import { ExerciseCardFooterReward } from "./ExerciseCardFooterReward";

interface ExerciseCardProps {
  exerciseUuId: string;
  listId: number;
  classroomUuId: string;
}

export const ExerciseCard = memo(
  ({ exerciseUuId, listId, classroomUuId }: ExerciseCardProps) => {
    const { exerciseOfList: ex } = useGetCachedExerciseOfList(
      exerciseUuId,
      listId,
    );

    const submissionStatus = useMemo(
      () => ex?.submissionStatus!,
      [ex?.submissionStatus],
    );

    const done = submissionStatus === SubmissionStatus.ACCEPTED;

    const xp = XP_BY_DIFFICULTY[ex.difficulty || 1];

    return (
      <ExerciseCardWrapper
        classroomUuId={classroomUuId}
        exerciseUuId={exerciseUuId}
        listId={listId}
        done={done}
      >
        {/* Top bar: XP gem + stars + language */}
        <ExerciseCardTopBar title={ex.title} />

        {/* Art window */}
        <ExerciseCardArtWindow done={done} />

        {/* Type + status */}
        <ExerciseCardTypeStatus ex={ex} />

        {/* Footer: reward */}
        <ExerciseCardFooterReward xp={xp} done={done} />
        {/* <div className="flex gap-1 ">
            <div className="flex flex-col">
              <Tooltip align="start" textContent={ex?.title}>
                <h4 className="text-lg font-bold text-white mb-4 line-clamp-1">
                  {ex?.title}
                </h4>
              </Tooltip>
              {loggedUser?.role === RoleUser.STUDENT && solveStatusEmoji && (
                <Tooltip
                  align="start"
                  textContent={
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">
                        {solveStatusName} {solveStatusEmoji}
                      </p>
                    </div>
                  }
                >
                  <p className="text-base text-white line-clamp-1 w-fit">
                    Status: {solveStatusEmoji}
                  </p>
                </Tooltip>
              )}
            </div>
            <FaCode
              className={cn(
                "my-auto ml-auto text-7xl text-white opacity-80",
                "rotate-x-45 rotate-z-43 transform-3d",
                "group-hover:rotate-x-0 group-hover:rotate-z-0",
                "duration-500 ease-in-out",
              )}
            />
          </div> */}
      </ExerciseCardWrapper>
    );
  },
);
