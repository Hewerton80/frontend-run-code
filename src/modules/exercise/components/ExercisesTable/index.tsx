import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useExercissesTable } from "./useExercissesTable";
import { IExercise } from "../../exerciseTypes";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { Link } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";
import { Card } from "@/components/ui/cards/Card";
import { ROUTES } from "@/routes/routes";

export const ExercisesTable = () => {
  const { loggedUser } = useLoggedUser();

  const {
    isFetchingExercises,
    exercises,
    exercisesError,
    goToPage,
    refetchExercises,
  } = useExercissesTable();

  const columns = useMemo<IColmunDataTable<IExercise>[]>(() => {
    const resultColumns: IColmunDataTable<IExercise>[] = [
      {
        field: "title",
        label: "Título",
        onParse: (exercise) => (
          <p className="line-clamp-1">{exercise?.title}</p>
        ),
      },
      {
        field: "category",
        label: "Categoria",
        onParse: (exercise) => (
          <p className="line-clamp-1">{exercise?.category?.name}</p>
        ),
      },
      {
        field: "difficulty",
        label: "Dificuldade",
      },
      {
        field: "author",
        label: "Autor(a)",
        onParse: (exercise) => <GroupedUserInfo user={exercise?.author!} />,
      },
    ];

    if (loggedUser?.role === RoleUser.SUPER_ADMIN) {
      resultColumns.push({
        field: "actions",
        label: "",
        onParse: () => (
          <div className="flex justify-end">
            <IconButton
              variantStyle="dark-ghost"
              icon={<BsThreeDotsVertical />}
            />
          </div>
        ),
      });
    } else {
      resultColumns.push({
        field: "actions",
        label: "",
        onParse: (exercise) => (
          <div className="flex justify-end">
            <Button variantStyle="dark-ghost" asChild>
              <Link to={ROUTES.EXERCISE_DETAIL(exercise?.uuid!)}>Ver</Link>
            </Button>
          </div>
        ),
      });
    }
    return resultColumns;
  }, [loggedUser]);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      {/* <Breadcrumbs
        isLoading={isFetchingExercises}
        items={[{ label: "🧩 Exercícios" }]}
      /> */}
      <div className="flex justify-between items-end gap-4">
        <Card.Title>🧩 Exercícios</Card.Title>
        {loggedUser?.role === RoleUser.TEACHER && (
          <Button asChild>
            <Link to={ROUTES.EXERCISES_CREATE}>Criar Exercício</Link>
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={exercises?.data || []}
        isLoading={isFetchingExercises}
        isError={!!exercisesError}
        onTryAgainIfError={refetchExercises}
        paginationConfig={{
          currentPage: exercises?.currentPage || 1,
          totalPages: exercises?.lastPage || 1,
          perPage: exercises?.perPage || 25,
          totalRecords: exercises?.total || 1,
          onChangePage: goToPage,
        }}
      />
    </div>
  );
};
