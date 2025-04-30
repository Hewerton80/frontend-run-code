"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useExercissesTable } from "./useExercissesTable";
import { IExercise } from "../../exerciseTypes";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useMemo } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";

export const ExercisesTable = () => {
  const { loggedUser } = useAuth();

  const {
    isExercisesLoading,
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
        label: "Autor",
        onParse: (exercise) => <GroupedUserInfo user={exercise?.author!} />,
      },
    ];

    if (loggedUser?.role === 3) {
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
              <ProgressLink href={`/exercises/${exercise?.uuid}`}>
                View
              </ProgressLink>
            </Button>
          </div>
        ),
      });
    }
    return resultColumns;
  }, [loggedUser]);

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isExercisesLoading}
        items={[{ label: "🧩 Exerciseas" }]}
      />
      <DataTable
        columns={columns}
        data={exercises?.data || []}
        isLoading={isExercisesLoading}
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
