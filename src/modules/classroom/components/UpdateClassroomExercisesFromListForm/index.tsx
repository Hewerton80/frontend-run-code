"use client";

import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import {
  UpdateExercises,
  useUpdateClassroomExercisesFromListForm,
} from "./useUpdateClassroomExercisesFromListForm";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { Button } from "@/components/ui/buttons/Button";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { TiInfoLargeOutline } from "react-icons/ti";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { ExerciseDescription } from "@/modules/exercise/components/SolveExerciseEnvirolment/ExerciseDescription";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { IUser } from "@/modules/user/userTypets";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { CiUndo } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

export const UpdateClassroomExercisesFromListFrom = () => {
  const {
    classroom,
    list,
    isLoadingExercises,
    exercisesError,
    showExerciseDetailsDialog,
    exerciseDetails,
    exerciseErrorDetails,
    isLoadingExerciseDetails,
    isExercisesLoading,
    errorCuerrentExercises,
    exercises,
    exercisesToAdd,
    isDirtyExercisesForm,
    isUpdatingClasrromExercisesFromList,
    handleUpdateClasrromExercisesFromList,
    removeExerciseToList,
    unDoRemoveExerciseToList,
    verifyIfExerciseAlreadyExistsInCurrentList,
    addExerciseToList,
    refetchExercises,
    goToPage,
    refetchCurrentExercises,
    openExerciseDetailsDialog,
    closeExerciseDetailsDialog,
    refetchExerciseDetails,
  } = useUpdateClassroomExercisesFromListForm();

  const getAuthorInfo = useCallback((author?: IUser) => {
    return (
      <div className="flex flex-col mt-2 ">
        <p>Autor(a):</p>
        <GroupedUserInfo user={author!} />
      </div>
    );
  }, []);

  const groupedExerciseInfo = useCallback(
    (exercise: UpdateExercises) => {
      return (
        <div className="flex flex-col">
          <Tooltip
            textContent={
              <div className="flex flex-col">
                <span>{exercise?.title}</span>
                <span className="text-xs text-muted-foreground">
                  Criada em:{" "}
                  {DateTime.format(exercise?.createdAt!, "dd MMM, yyyy")}
                </span>
                {getAuthorInfo(exercise?.author)}
              </div>
            }
            align="start"
          >
            <p
              role="button"
              className={twMerge(
                "line-clamp-1 w-fit cursor-pointer hover:underline",
                exercise?.removed && "line-through"
              )}
              onClick={() => openExerciseDetailsDialog(exercise?.uuid!)}
            >
              {exercise?.title}
            </p>
          </Tooltip>
        </div>
      );
    },
    [getAuthorInfo, openExerciseDetailsDialog]
  );

  const exercisesColumns = useMemo<IColmunDataTable<UpdateExercises>[]>(() => {
    return [
      {
        field: "title",
        label: "Título",
        onParse: (exercise) => groupedExerciseInfo(exercise),
      },
      {
        field: "category",
        label: "Categoria",
        onParse: (exercise) => exercise?.category?.name,
      },
      {
        field: "actions",
        label: "",
        onParse: (exercise) => (
          <div className="flex items-center justify-end gap-2">
            <Tooltip textContent="Adicionar Exercício">
              {verifyIfExerciseAlreadyExistsInCurrentList(exercise?.uuid!) ? (
                <Tooltip textContent="Adicionado">
                  <span className="flex items-center justify-center size-8 text-success">
                    <FaCheck />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip textContent="Adicionar Exercício">
                  <IconButton
                    onClick={() => addExerciseToList(exercise?.uuid!)}
                    icon={<MdOutlineDoubleArrow />}
                  />
                </Tooltip>
              )}
            </Tooltip>
            <Tooltip textContent="Ver detalhes">
              <IconButton
                variantStyle="dark-ghost"
                icon={<TiInfoLargeOutline />}
                onClick={() => openExerciseDetailsDialog(exercise?.uuid!)}
              />
            </Tooltip>
          </div>
        ),
      },
    ];
  }, [
    groupedExerciseInfo,
    openExerciseDetailsDialog,
    verifyIfExerciseAlreadyExistsInCurrentList,
    addExerciseToList,
  ]);

  const exercisesToAddColumns = useMemo<
    IColmunDataTable<UpdateExercises>[]
  >(() => {
    return [
      {
        field: "title",
        label: "Título",
        onParse: (exercise) => groupedExerciseInfo(exercise),
      },
      {
        field: "category",
        label: "Categoria",
        onParse: (exercise) => exercise?.category?.name,
      },
      {
        field: "actions",
        label: "",
        onParse: (exercise) => (
          <div className="flex items-center justify-end gap-2">
            {exercise?.removed ? (
              <Tooltip textContent="Desfazer">
                <IconButton
                  variantStyle="dark-ghost"
                  onClick={() => unDoRemoveExerciseToList(exercise?.uuid!)}
                  icon={<CiUndo />}
                />
              </Tooltip>
            ) : (
              <Tooltip textContent="Remover Exercício">
                <IconButton
                  variantStyle="warning"
                  onClick={() => removeExerciseToList(exercise?.uuid!)}
                  icon={<MdOutlineDoubleArrow className="rotate-180" />}
                />
              </Tooltip>
            )}

            <Tooltip textContent="Ver detalhes">
              <IconButton
                variantStyle="dark-ghost"
                icon={<TiInfoLargeOutline />}
                onClick={() => openExerciseDetailsDialog(exercise?.uuid!)}
              />
            </Tooltip>
          </div>
        ),
      },
    ];
  }, [
    groupedExerciseInfo,
    openExerciseDetailsDialog,
    removeExerciseToList,
    unDoRemoveExerciseToList,
  ]);

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isLoadingExercises}
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: classroom?.name || "-" },
            { label: "📝 Listas", href: `/classroom/${classroom?.uuid}/lists` },
            { label: list?.title || "-" },
            { label: "Atualizar exercícios" },
          ]}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <DataTable
              columns={exercisesColumns}
              data={exercises?.data || []}
              isLoading={isExercisesLoading}
              isError={!!exercisesError}
              onTryAgainIfError={refetchCurrentExercises}
              paginationConfig={{
                currentPage: exercises?.currentPage || 1,
                totalPages: exercises?.lastPage || 1,
                perPage: exercises?.perPage || 25,
                totalRecords: exercises?.total || 1,
                onChangePage: goToPage,
              }}
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <DataTable
              columns={exercisesToAddColumns}
              data={exercisesToAdd || []}
              isLoading={isLoadingExercises}
              isError={!!errorCuerrentExercises}
              onTryAgainIfError={refetchExercises}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Button
            fullWidth
            disabled={!isDirtyExercisesForm}
            onClick={handleUpdateClasrromExercisesFromList}
            isLoading={isUpdatingClasrromExercisesFromList}
          >
            Salvar
          </Button>
          <Link href={`/classroom/${classroom?.uuid}/lists`}>
            <Button
              fullWidth
              variantStyle="secondary"
              disabled={isUpdatingClasrromExercisesFromList}
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
      <Dialog.Root
        open={showExerciseDetailsDialog}
        onOpenChange={(value) => !value && closeExerciseDetailsDialog()}
      >
        <Dialog.Content size="xl">
          <Dialog.Header>
            <Dialog.Title>Ver detalhes</Dialog.Title>
          </Dialog.Header>

          {isLoadingExerciseDetails && (
            <div className="flex items-center justify-center w-full h-full">
              <Spinner size={64} />
            </div>
          )}
          {exerciseErrorDetails && (
            <FeedBackError onTryAgain={refetchExerciseDetails} />
          )}
          <div className="flex flex-col max-h-[calc(100vh-112px)] overflow-y-auto">
            <ExerciseDescription
              orientation="horizontal"
              exercise={exerciseDetails!}
            />
            <div className="flex justify-end">
              {getAuthorInfo(exerciseDetails?.author)}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
