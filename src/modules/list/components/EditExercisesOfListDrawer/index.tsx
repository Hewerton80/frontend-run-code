import { forwardRef, memo, ReactNode } from "react";
import { Drawer } from "@/components/ui/overlay/Drawer";
import { Button } from "@/components/ui/buttons/Button";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { Slot } from "@radix-ui/react-slot";
import { useEditExercisesOfListDrawer } from "./useEditExercisesOfListDrawer";
import { useTriggerEditExercisesOfListDrawer } from "./useTriggerEditExercisesOfListDrawer";
import { EditExercisesOfListRow } from "./EditExercisesOfListRow";
import { ExerciseDetail } from "../../../exercise/components/ExerciseDetailDialog";

const EditExercisesOfListDrawer = () => {
  const {
    showDrawer,
    exerciseUuids,
    pagination,
    isExercisesLoading,
    exercisesError,
    isDirty,
    isUpdating,
    verifyIfExerciseIsInList,
    addExerciseToList,
    removeExerciseToList,
    refetchExercises,
    handleSave,
    handleClose,
  } = useEditExercisesOfListDrawer();

  return (
    <>
      <Drawer.Root
        open={showDrawer}
        onOpenChange={(value) => !value && handleClose()}
      >
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Adicionar/Editar exercícios</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body className="p-0">
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
                <EditExercisesOfListRow
                  exerciseUuid={uuid}
                  isInList={verifyIfExerciseIsInList(uuid)}
                  addExerciseToList={addExerciseToList}
                  removeExerciseToList={removeExerciseToList}
                />
              )}
            />
          </Drawer.Body>

          <Drawer.Footer>
            <Button
              fullWidth
              disabled={!isDirty}
              onClick={handleSave}
              isLoading={isUpdating}
            >
              Salvar
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>

      <ExerciseDetail.Dialog />
    </>
  );
};

interface EditExercisesOfListTriggerButtonProps {
  children?: ReactNode;
  listId?: number | null;
  classroomId?: string | null;
}

const EditExercisesOfListTriggerButton = (
  { children, listId, classroomId }: EditExercisesOfListTriggerButtonProps,
  ref?: any,
) => {
  const { openDrawer } = useTriggerEditExercisesOfListDrawer();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() => {
        if (listId && classroomId) {
          openDrawer(listId, classroomId);
        }
      }}
      aria-label="Adicionar/Editar exercícios da lista"
    >
      {children}
    </Comp>
  );
};

const EditExercisesOfList = {
  Drawer: memo(EditExercisesOfListDrawer),
  TriggerButton: memo(forwardRef(EditExercisesOfListTriggerButton)),
};

export { EditExercisesOfList };

EditExercisesOfList.Drawer.displayName = "EditExercisesOfListDrawer";
EditExercisesOfList.TriggerButton.displayName =
  "EditExercisesOfListTriggerButton";
