import { Table } from "@/components/ui/dataDisplay/Table";
import { Button } from "@/components/ui/buttons/Button";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useGetCachedExercise } from "@/modules/exercise/hooks/useGetCachedExercise";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { memo } from "react";

interface IExerciseTableRowProps {
  exerciseUuid: string;
}

export const ExerciseTableRow = memo(
  ({ exerciseUuid }: IExerciseTableRowProps) => {
    const { cachedExercise: exercise } = useGetCachedExercise(exerciseUuid);
    const { loggedUser } = useLoggedUser();

    return (
      <Table.Row>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.title}</p>
        </Table.Data>
        <Table.Data>
          <p className="line-clamp-1">{exercise?.category?.name}</p>
        </Table.Data>
        <Table.Data>{exercise?.difficulty}</Table.Data>
        <Table.Data>
          <GroupedUserInfo user={exercise?.author!} />
        </Table.Data>
        <Table.Data>
          <div className="flex justify-end">
            {loggedUser?.role === RoleUser.SUPER_ADMIN ? (
              <IconButton
                variantStyle="dark-ghost"
                icon={<BsThreeDotsVertical />}
              />
            ) : (
              <Button variantStyle="dark-ghost" asChild>
                <Link to={ROUTES.EXERCISE_DETAIL(exercise?.uuid!)}>Ver</Link>
              </Button>
            )}
          </div>
        </Table.Data>
      </Table.Row>
    );
  },
);

ExerciseTableRow.displayName = "ExerciseTableRow";
