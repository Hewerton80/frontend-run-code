import { Dialog } from "@/components/ui/overlay/Dialog";
import { useClassromTeacherFormDialog } from "./useClassromTeacherFormDialog";
import { Controller } from "react-hook-form";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { Alert } from "@/components/ui/feedback/Alert";
import { cn } from "@/utils/cn";
import { forwardRef, memo, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { useTriggerClassroomTeacherFormDialog } from "./useTriggerClassroomTeacherFormDialog";

const ClassroomTeacherFormDialog = () => {
  const {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    isSubmitting,
    classroomUser,
    classroom,
    classroomUserError,
    isLoadingClassroomUser,
    isEdit,
    canEditClassroomUser,
    showClassroomTeacherFormDialog,
    handleClose,
    refetchClassroomUser,
    submitClassroomTeacherForm,
  } = useClassromTeacherFormDialog();

  return (
    <Dialog.Root
      open={showClassroomTeacherFormDialog}
      onOpenChange={(value) => !value && handleClose()}
    >
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {isEdit ? "Editar" : "Criar"} professor(a)
          </Dialog.Title>
        </Dialog.Header>
        {classroomUserError || isLoadingClassroomUser ? (
          <div className={cn("flex items-center justify-center w-full h-80")}>
            {classroomUserError && (
              <FeedBackError onTryAgain={refetchClassroomUser} />
            )}
            {isLoadingClassroomUser && <Spinner size={64} />}
          </div>
        ) : (
          <form
            onSubmit={submitClassroomTeacherForm}
            className="flex flex-col gap-4"
          >
            {isEdit &&
              !classroom?.myClassroomPermissions?.canManageTeachers && (
                <Alert.Root variant="info">
                  <Alert.Title>
                    Você não tem permissão para editar essas informações
                  </Alert.Title>
                  <Alert.Description>
                    Entre em contato com o professor(a) responsável pela turma
                    caso precise fazer alguma alteração.
                  </Alert.Description>
                </Alert.Root>
              )}
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
                    </div>
                    {classroomUser?.uuid ? (
                      <GroupedUserInfo user={classroomUser} />
                    ) : (
                      <AsyncTeacherSelect
                        {...restField}
                        id={restField.name}
                        onChange={(option) => onChange(option?.value)}
                        placeholder="Nome do professor(a)"
                        required
                        disabled={isEdit}
                        error={fieldState.error?.message}
                      />
                    )}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
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
                    disabled={!canEditClassroomUser}
                  />
                )}
              />
            </div>
            <div>
              <Dialog.Footer className="mt-16">
                {canEditClassroomUser && (
                  <>
                    <Button
                      disabled={isSubmitting}
                      variantStyle="secondary"
                      onClick={handleClose}
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
                )}
              </Dialog.Footer>
            </div>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

interface ClassroomTeacherFormTriggerButtonProps {
  children?: ReactNode;
  teacherId?: string | null;
}

const ClassroomTeacherFormTriggerButton = (
  { children, teacherId }: ClassroomTeacherFormTriggerButtonProps,
  ref?: any,
) => {
  const { showClassroomTeacherFormDialogWithTeacherId } =
    useTriggerClassroomTeacherFormDialog();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() =>
        showClassroomTeacherFormDialogWithTeacherId(teacherId || null)
      }
      aria-label={teacherId ? "Editar professor(a)" : "Adicionar professor(a)"}
    >
      {children}
    </Comp>
  );
};

const ClassroomTeacherForm = {
  Dialog: memo(ClassroomTeacherFormDialog),
  TriggerButton: memo(forwardRef(ClassroomTeacherFormTriggerButton)),
};

export { ClassroomTeacherForm };

ClassroomTeacherForm.Dialog.displayName = "ClassroomTeacherFormDialog";
