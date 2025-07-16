import { Dialog } from "@/components/ui/overlay/Dialog";
import { useClassromTeacherFormDialog } from "./useClassromTeacherFormDialog";
import { Controller } from "react-hook-form";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { useMemo } from "react";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { twMerge } from "tailwind-merge";
import { Alert } from "@/components/ui/feedback/Alert";

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
    isSubmitting,
    classroomUser,
    classroom,
    classroomUserError,
    isLoadingClassroomUser,
    isEdit,
    canEditClassroomUser,
    refetchClassroomUser,
    submitClassroomTeacherForm,
  } = useClassromTeacherFormDialog(teacherId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {teacherId ? "Editar" : "Criar"} professor(a)
          </Dialog.Title>
        </Dialog.Header>
        {classroomUserError || isLoadingClassroomUser ? (
          <div
            className={twMerge("flex items-center justify-center w-full h-80")}
          >
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
                )}
              </Dialog.Footer>
            </div>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};
