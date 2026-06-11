import { useClassroomFormDialog } from "./useClassroomFormDialog";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Button } from "@/components/ui/buttons/Button";
// import { MultSelect } from "@/components/ui/forms/selects";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { twMerge } from "tailwind-merge";
import { Alert } from "@/components/ui/feedback/Alert";
import { CustomCombobox } from "@/components/ui/forms/selects/CustomCombobox";
import { LIST_OF_LANGUAGES } from "@/modules/language/utils/languagesConfig";
import { LanguageOptionDisplay } from "@/modules/language/components/LanguangeOptionDisplay";

interface ClassroomFormDialogProps {
  classroomId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ClassroomFormDialog = ({
  classroomId,
  isOpen,
  onClose,
}: ClassroomFormDialogProps) => {
  const {
    classroomFormState,
    classroomFormControl,
    isSubmittingClassroom,
    classroomError,
    isFetchingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    registerClassroomForm,
    submitClassroom,
  } = useClassroomFormDialog(classroomId, onClose);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(value) => !value && onClose()}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              🏫 {isEditClassroom ? "Editar" : "Criar"} turma
            </Dialog.Title>
          </Dialog.Header>
          {classroomError || isFetchingClassroom ? (
            <div
              className={twMerge(
                "flex items-center justify-center w-full h-80",
              )}
            >
              {classroomError && (
                <FeedBackError onTryAgain={refetchClassroom} />
              )}
              {isFetchingClassroom && <Spinner size={64} />}
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={submitClassroom}>
              {!canEditClassroom && (
                <Alert.Root variant="info">
                  <Alert.Title>
                    Você não tem permissão para editar essa turma
                  </Alert.Title>
                  <Alert.Description>
                    Entre em contato com o(a) professor(a) responsável pela
                    turma caso precise fazer alguma alteração.
                  </Alert.Description>
                </Alert.Root>
              )}
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
                  render={({
                    field: { onChange, ...restField },
                    fieldState,
                  }) => (
                    <>
                      <CustomCombobox
                        {...restField}
                        name={restField.name}
                        label="Linguagenssss"
                        placeholder="Selecione as linguagens"
                        items={LIST_OF_LANGUAGES}
                        displayItem={(item) => (
                          <LanguageOptionDisplay languageName={item.value} />
                        )}
                        onChangeValue={onChange}
                        renderItem={(item) => (
                          <LanguageOptionDisplay languageName={item.value} />
                        )}
                        valueExtractor={(item) => item.value}
                        disabled={!canEditClassroom}
                        error={fieldState.error?.message}
                      />
                    </>
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
                  {canEditClassroom && (
                    <>
                      <Button
                        disabled={isSubmittingClassroom}
                        variantStyle="secondary"
                        onClick={onClose}
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
                    </>
                  )}
                </Dialog.Footer>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
