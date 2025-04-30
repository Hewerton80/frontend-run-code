import { Dialog } from "@/components/ui/overlay/Dialog";
import { IList } from "../../listTypes";
import { Switch } from "@/components/ui/forms/Switch";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { useClassroomListFormDialog } from "./useClassroomListFormDialog";
import { Controller } from "react-hook-form";

interface ClassroomListFormDialogProps {
  onClose: () => void;
  data: IList | null;
}

export const ClassroomListFormDialog = ({
  data: listToEdit,
  onClose,
}: ClassroomListFormDialogProps) => {
  const isOpen = !!listToEdit;

  const {
    classroomListFormControl,
    classroomListFormState,
    hasRangeDate,
    isUpdatingClassroomList,
    classroomListFormRegister,
    updateClassroomList,
  } = useClassroomListFormDialog(listToEdit);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(value) => !value && onClose()}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Configurar</Dialog.Title>
          </Dialog.Header>
          <form className="flex flex-col h-72" onSubmit={updateClassroomList}>
            <div className="flex flex-col gap-8">
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
                        label="Início"
                        type="date"
                        error={classroomListFormState.errors.startDate?.message}
                      />
                      <Input
                        {...classroomListFormRegister("endDate")}
                        id={classroomListFormRegister("endDate").name}
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
                disabled={isUpdatingClassroomList}
                variantStyle="secondary"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button isLoading={isUpdatingClassroomList} type="submit">
                Salvar
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
