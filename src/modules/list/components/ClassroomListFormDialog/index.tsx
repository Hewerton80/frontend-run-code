import { Dialog } from "@/components/ui/overlay/Dialog";
import { IList } from "../../listTypes";
import { Switch } from "@/components/ui/forms/Switch";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { useClassroomListFormDialog } from "./useClassroomListFormDialog";
import { Controller } from "react-hook-form";

interface ClassroomListFormDialogProps {
  data?: IList | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomListFormDialog = ({
  data: listToEdit,
  isOpen,
  onClose,
}: ClassroomListFormDialogProps) => {
  const {
    classroomListFormControl,
    classroomListFormState,
    hasRangeDate,
    isSubmitting,
    classroomListFormRegister,
    clearClassroomListFormStates,
    updateClassroomList,
  } = useClassroomListFormDialog(listToEdit);

  const isEditing = !!listToEdit?.uuid;

  const handleClose = () => {
    onClose();
    clearClassroomListFormStates();
  };

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(value) => !value && handleClose()}
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{isEditing ? "Editar" : "Criar"}</Dialog.Title>
          </Dialog.Header>
          <form className="flex flex-col h-96" onSubmit={updateClassroomList}>
            <div className="flex flex-col gap-8">
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
                  <>
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
                  </>
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
            </div>
            <Dialog.Footer className="mt-auto">
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
                type="submit"
              >
                Salvar
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
