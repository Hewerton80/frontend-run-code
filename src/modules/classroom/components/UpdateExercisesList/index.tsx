import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useUpdateExercisesList } from "./useUpdateExercisesList";
import { Button } from "@/components/ui/buttons/Button";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { ExerciseDescription } from "@/modules/exercise/components/SolveExerciseEnvirolment/ExerciseDescription";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { ROUTES } from "@/routes/routes";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { UpdateExercisesListAvailableRow } from "./UpdateExercisesListAvailableRow";
import { UpdateExercisesListSelectedRow } from "./UpdateExercisesListSelectedRow";

export const UpdateExercisesList = () => {
  const {
    classroom,
    list,
    isFetchingExercises,
    exercisesError,
    showExerciseDetailsDialog,
    exerciseDetails,
    exerciseErrorDetails,
    isLoadingExerciseDetails,
    isExercisesLoading,
    errorCuerrentExercises,
    exerciseUuids,
    exercisesToAddItems,
    pagination,
    isDirtyExercisesForm,
    isUpdatingClassroomExercisesFromList,
    currentExercises,
    handleResetExercisesForm,
    handleUpdateClasrromExercisesFromList,
    removeExerciseToList,
    unDoRemoveExerciseToList,
    verifyIfExerciseAlreadyExistsInCurrentList,
    addExerciseToList,
    refetchExercises,
    refetchCurrentExercises,
    openExerciseDetailsDialog,
    closeExerciseDetailsDialog,
    refetchExerciseDetails,
  } = useUpdateExercisesList();

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isFetchingExercises}
          items={[
            { label: "🏠 Home", href: ROUTES.HOME },
            { label: classroom?.name || "-" },
            {
              label: "📝 Listas",
              href: ROUTES.CLASSROOM_LISTS(classroom?.uuid!),
            },
            { label: list?.title || "-" },
            {
              label: `${
                currentExercises?.length === 0 ? "Adicionar" : "Editar"
              } exercícios`,
            },
          ]}
        />
        <div className="flex justify-between items-end">
          <BackLink to={ROUTES.CLASSROOM_LISTS(classroom?.uuid!)}>
            Voltar para listas da turma
          </BackLink>
          <div className="flex gap-4">
            <Button
              variantStyle="secondary"
              disabled={
                isUpdatingClassroomExercisesFromList || !isDirtyExercisesForm
              }
              onClick={handleResetExercisesForm}
            >
              Desfazer alterações
            </Button>
            <Button
              disabled={!isDirtyExercisesForm}
              onClick={handleUpdateClasrromExercisesFromList}
              isLoading={isUpdatingClassroomExercisesFromList}
            >
              Salvar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <CustomDataTable
              columns={["Título", "Categoria", ""]}
              data={exerciseUuids}
              idExtractor={(uuid) => uuid}
              isLoading={isExercisesLoading}
              errorMessage={
                exercisesError
                  ? (exercisesError as any)?.response?.data?.message ||
                    "Erro ao carregar exercícios"
                  : undefined
              }
              onRetry={refetchExercises}
              pagination={pagination}
              numberOfSkeletonRows={10}
              renderItem={({ item: uuid }) => (
                <UpdateExercisesListAvailableRow
                  exerciseUuid={uuid}
                  addExerciseToList={addExerciseToList}
                  openExerciseDetailsDialog={openExerciseDetailsDialog}
                  verifyIfExerciseAlreadyExistsInCurrentList={
                    verifyIfExerciseAlreadyExistsInCurrentList
                  }
                />
              )}
            />
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-282px)]">
            <CustomDataTable
              columns={["Título", "Categoria", ""]}
              data={exercisesToAddItems}
              idExtractor={(item) => item.uuid}
              isLoading={isFetchingExercises}
              errorMessage={
                errorCuerrentExercises
                  ? (errorCuerrentExercises as any)?.response?.data?.message ||
                    "Erro ao carregar exercícios da lista"
                  : undefined
              }
              emptyMessage="Nenhum exercício adicionado"
              onRetry={refetchCurrentExercises}
              renderItem={({ item }) => (
                <UpdateExercisesListSelectedRow
                  exerciseUuid={item.uuid}
                  removed={item.removed}
                  removeExerciseToList={removeExerciseToList}
                  unDoRemoveExerciseToList={unDoRemoveExerciseToList}
                  openExerciseDetailsDialog={openExerciseDetailsDialog}
                />
              )}
            />
          </div>
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
              <div className="flex flex-col mt-2">
                <p>Autor(a):</p>
                <GroupedUserInfo user={exerciseDetails?.author!} />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
