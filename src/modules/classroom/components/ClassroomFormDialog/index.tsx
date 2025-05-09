import { IClassroom } from "@/modules/classroom/classroomType";
import { useClassroomFormDialog } from "./useClassroomFormDialog";
import { useCallback } from "react";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Button } from "@/components/ui/buttons/Button";
import { MultSelect } from "@/components/ui/forms/selects";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";

interface ClassroomFormDialogProps {
  classroomId?: string;
  isOpen: boolean;
  onClose: (refresh?: boolean) => void;
}

export const ClassroomFormDialog = ({
  classroomId,
  isOpen,
  onClose,
}: ClassroomFormDialogProps) => {
  const {
    classroomFormState,
    classroomFormControl,
    languagesOptions,
    isSubmittingClassroom,
    currentClassroom,
    loggedUser,
    errorClassroom,
    isLoadingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    registerClassroomForm,
    clearClassroomFormStates,
    submitClassroom,
  } = useClassroomFormDialog(classroomId);

  const handleClose = useCallback(() => {
    onClose();
    clearClassroomFormStates();
  }, [onClose, clearClassroomFormStates]);

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(value) => !value && handleClose()}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              🏫 {isEditClassroom ? "Editar" : "Criar"} turma
            </Dialog.Title>
          </Dialog.Header>
          <form className="flex flex-col gap-4" onSubmit={submitClassroom}>
            <div className="flex flex-col">
              <Input
                {...registerClassroomForm("name")}
                id={registerClassroomForm("name").name}
                label="Nome"
                placeholder="EX: Turma de lógica 2025.2"
                required
                error={classroomFormState.errors.name?.message}
                disabled={!canEditClassroom}
              />
            </div>
            <div className="flex flex-col">
              <Controller
                name="languages"
                control={classroomFormControl}
                render={({ field, fieldState }) => (
                  <MultSelect
                    {...field}
                    id={field.name}
                    label="Linguagens"
                    placeholder="Selecione as linguagens"
                    options={languagesOptions}
                    error={fieldState.error?.message}
                    required
                    disabled={!canEditClassroom}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <Controller
                name="isVisible"
                control={classroomFormControl}
                render={({ field: { onChange, value, ...restField } }) => (
                  <Switch
                    {...restField}
                    id={restField.name}
                    checked={value}
                    onCheckedChange={onChange}
                    label="Visível para os alunos"
                    disabled={!canEditClassroom}
                  />
                )}
              />
            </div>
            <div>
              <Dialog.Footer className="mt-16">
                <Button
                  disabled={isSubmittingClassroom}
                  variantStyle="secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!classroomFormState.isDirty}
                  isLoading={isSubmittingClassroom}
                  type="submit"
                >
                  Salvar
                </Button>
              </Dialog.Footer>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
