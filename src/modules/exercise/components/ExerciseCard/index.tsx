import { memo, useMemo } from "react";
import { useGetCachedExerciseOfList } from "../../hooks/useGetCachedExerciseOfList";
import {
  SubmissionStatus,
  XP_BY_DIFFICULTY,
} from "@/modules/submission/submissionType";
import { ExerciseCardWrapper } from "./ExerciseCardWrapper";
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
        {/* <ExerciseCardTopBar ex={ex} /> */}

        {/* Art window */}
        <ExerciseCardArtWindow ex={ex} />

        {/* Type + status */}
        <ExerciseCardTypeStatus ex={ex} />

        {/* Footer: reward */}
        <ExerciseCardFooterReward xp={xp} done={done} />
      </ExerciseCardWrapper>
    );
  },
);
