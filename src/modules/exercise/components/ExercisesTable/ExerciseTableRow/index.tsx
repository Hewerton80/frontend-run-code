import { Table } from "@/components/ui/dataDisplay/Table";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useGetCachedExercise } from "@/modules/exercise/hooks/useGetCachedExercise";
import { ExerciseTableActions } from "@/modules/exercise/components/ExerciseTableActions";
import { memo } from "react";

interface IExerciseTableRowProps {
  exerciseUuid: string;
}

export const ExerciseTableRow = memo(
  ({ exerciseUuid }: IExerciseTableRowProps) => {
    const { cachedExercise: exercise } = useGetCachedExercise(exerciseUuid);

    return (
      <Table.Row>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.title}</p>
        </Table.Data>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.category?.name || "-"}</p>
        </Table.Data>
        <Table.Data>{exercise?.difficulty || "-"}</Table.Data>
        <Table.Data>
          <GroupedUserInfo user={exercise?.author!} />
        </Table.Data>
        <Table.Data>
          <div className="flex justify-end">
            <ExerciseTableActions exercise={exercise} />
          </div>
        </Table.Data>
      </Table.Row>
    );
  },
);

ExerciseTableRow.displayName = "ExerciseTableRow";
