import { Table } from "@/components/ui/dataDisplay/Table";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useGetCachedExerciseRow } from "@/modules/exercise/hooks/useGetCachedExerciseRow";
import { ExerciseTableActions } from "@/modules/exercise/components/ExerciseTableActions";
import { memo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import {
  ExerciseStatus,
  ExerciseStatusNames,
} from "@/modules/exercise/exerciseTypes";

interface IExerciseTableRowProps {
  exerciseUuid: string;
}

export const ExerciseTableRow = memo(
  ({ exerciseUuid }: IExerciseTableRowProps) => {
    const { loggedUser } = useLoggedUser();
    const { cachedExercise: exercise } = useGetCachedExerciseRow(exerciseUuid);
    const statusVariantMap: Record<
      ExerciseStatus | number,
      "warning" | "success" | "dark"
    > = {
      [ExerciseStatus.DRAFT]: "warning",
      [ExerciseStatus.PUBLISHED]: "success",
      [ExerciseStatus.HIDDEN]: "dark",
    };

    return (
      <Table.Row>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.title}</p>
        </Table.Data>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.category?.name || "-"}</p>
        </Table.Data>
        <Table.Data>{exercise?.difficulty || "-"}</Table.Data>
        {loggedUser?.role === RoleUser.TEACHER && (
          <Table.Data>
            <Badge variant={statusVariantMap[exercise?.status || 0]}>
              {ExerciseStatusNames[exercise?.status || 0]}
            </Badge>
          </Table.Data>
        )}
        <Table.Data>
          <GroupedUserInfo
            user={{
              email: exercise?.author?.email || "",
              name: exercise?.author?.name || "",
              surname: exercise?.author?.surname || "",
              avatarBgColor: exercise?.author?.avatarBgColor || "",
              avatarUrl: exercise?.author?.avatarUrl || "",
            }}
          />
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
