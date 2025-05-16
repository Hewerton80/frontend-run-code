"use client";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { useClassromTeacherForm } from "./useClassromTeacherForm";
import { Controller } from "react-hook-form";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";

interface ClassroomTeacherFormDialogProps {
  teacherId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomTeacherFormDialog = ({
  isOpen,
  onClose,
  teacherId,
}: ClassroomTeacherFormDialogProps) => {
  const {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    loggedUser,
    isSubmitting,
    submitClassroomTeacherForm,
  } = useClassromTeacherForm(teacherId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {teacherId ? "Editar" : "Criar"} professor
          </Dialog.Title>
        </Dialog.Header>
        <form
          onSubmit={submitClassroomTeacherForm}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col w-full">
            <Controller
              control={classroomTeacherFormControl}
              name="value"
              render={({ field: { onChange, ...restField }, fieldState }) => (
                <>
                  <div className="flex gap-2 mb-2">
                    <FormLabel className="mb-0" required>
                      Professor(a)
                    </FormLabel>
                    {/* {isDisabled ? (
                                    <div className="flex gap-2">
                                      {isAuthor && (
                                        <Badge variant="dark">Autor(a)</Badge>
                                      )}
                                      {isLoggedUser && (
                                        <Badge variant="dark">Você</Badge>
                                      )}
                                    </div>
                                  ) : undefined} */}
                  </div>
                  <AsyncTeacherSelect
                    {...restField}
                    id={restField.name}
                    // defaultOptions={[
                    //   {
                    //     label: "blablab",
                    //     value: "xd",
                    //   },
                    // ]}
                    onChange={(option) => onChange(option?.value)}
                    placeholder="Nome do professor"
                    required
                    error={fieldState.error?.message}
                    //   // disabled={isDisabled}
                  />
                </>
              )}
            />
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-4">
            <Controller
              name="canEditClassroom"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode editar a turma"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canManageTeachers"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode gerenciar professores"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canCreateList"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode criar lista"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canEditList"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode editar lista"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canDeleteList"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode deletar lista"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canManageExercises"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode gerenciar exercícios"
                  // disabled={isDisabled}
                />
              )}
            />
            <Controller
              name="canRemoveMember"
              control={classroomTeacherFormControl}
              render={({ field: { onChange, value, ...restField } }) => (
                <Checkbox
                  {...restField}
                  id={restField.name}
                  checked={value}
                  onCheckedChange={onChange}
                  label="Pode remover aluno(a)s"
                  // disabled={isDisabled}
                />
              )}
            />
          </div>
          <div>
            <Dialog.Footer className="mt-16">
              {/* {canEditClassroom && ( */}
              <>
                <Button
                  disabled={isSubmitting}
                  variantStyle="secondary"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={!classroomTeacherFormState.isDirty}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Salvar
                </Button>
              </>
              {/* )} */}
            </Dialog.Footer>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
