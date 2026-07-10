import { Drawer } from "@/components/ui/overlay/Drawer";
import { Switch } from "@/components/ui/forms/Switch";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { useClassroomListFormDrawer } from "./useClassroomListFormDrawer";
import { Controller } from "react-hook-form";
import { forwardRef, memo, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { useTriggerClassroomListFormDrawer } from "./useTriggerClassroomListFormDrawer";

const ClassroomListFormDrawer = () => {
  const {
    classroomListFormControl,
    classroomListFormState,
    hasRangeDate,
    isSubmitting,
    isEditing,
    showClassroomListFormDrawer,
    handleClose,
    classroomListFormRegister,
    submitClassroomListForm,
  } = useClassroomListFormDrawer();

  return (
    <Drawer.Root
      open={showClassroomListFormDrawer}
      onOpenChange={(value) => !value && handleClose()}
    >
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>📋 {isEditing ? "Editar" : "Criar"} lista</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <form className="flex flex-col gap-4">
            <Input
              {...classroomListFormRegister("title")}
              id={classroomListFormRegister("title").name}
              required
              label="Título"
              placeholder="Título da lista"
              error={classroomListFormState.errors.title?.message}
            />
            <div className="flex flex-col gap-2">
              <Controller
                name="hasRangeDate"
                control={classroomListFormControl}
                render={({ field: { onChange, value, ...restField } }) => (
                  <Switch
                    {...restField}
                    checked={value}
                    onCheckedChange={onChange}
                    id={restField.name}
                    label="Possui Início e fim?"
                  />
                )}
              />
              {hasRangeDate && (
                <div className="flex gap-4">
                  <Input
                    {...classroomListFormRegister("startDate")}
                    id={classroomListFormRegister("startDate").name}
                    required
                    label="Início"
                    type="date"
                    error={classroomListFormState.errors.startDate?.message}
                  />
                  <Input
                    {...classroomListFormRegister("endDate")}
                    id={classroomListFormRegister("endDate").name}
                    required
                    label="Fim"
                    type="date"
                    error={classroomListFormState.errors.endDate?.message}
                  />
                </div>
              )}
            </div>
            <Controller
              name="isVisible"
              control={classroomListFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Visível para os alunos"
                />
              )}
            />
          </form>
        </Drawer.Body>

        <Drawer.Footer className="gap-2">
          <Button
            disabled={isSubmitting}
            variantStyle="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            disabled={!classroomListFormState.isDirty}
            isLoading={isSubmitting}
            onClick={submitClassroomListForm as any}
          >
            Salvar
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};

interface ClassroomListFormTriggerButtonProps {
  children?: ReactNode;
  listId?: number | null;
}

const ClassroomListFormTriggerButton = (
  { children, listId }: ClassroomListFormTriggerButtonProps,
  ref?: any,
) => {
  const { showClassroomListFormDrawerWithListId } =
    useTriggerClassroomListFormDrawer();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() => showClassroomListFormDrawerWithListId(listId || null)}
      aria-label={listId ? "Editar lista" : "Criar lista"}
    >
      {children}
    </Comp>
  );
};

const ClassroomListForm = {
  Drawer: memo(ClassroomListFormDrawer),
  TriggerButton: memo(forwardRef(ClassroomListFormTriggerButton)),
};

export { ClassroomListForm };

ClassroomListForm.Drawer.displayName = "ClassroomListFormDrawer";
ClassroomListForm.TriggerButton.displayName = "ClassroomListFormTriggerButton";
