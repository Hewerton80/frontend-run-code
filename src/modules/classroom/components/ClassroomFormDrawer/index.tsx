import { forwardRef, memo, ReactNode } from "react";
import { Drawer } from "@/components/ui/overlay/Drawer";
import { Button } from "@/components/ui/buttons/Button";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { Alert } from "@/components/ui/feedback/Alert";
import { CustomCombobox } from "@/components/ui/forms/selects/CustomCombobox";
import { LIST_OF_LANGUAGES } from "@/modules/language/utils/languagesConfig";
import { LanguageOptionDisplay } from "@/modules/language/components/LanguangeOptionDisplay";
import { Slot } from "@radix-ui/react-slot";
import { useClassroomFormDrawer } from "./useClassroomFormDrawer";
import { useTriggerClassroomFormDrawer } from "./useTriggerClassroomFormDrawer";

const ClassroomFormDrawer = () => {
  const {
    showDrawer,
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
    handleClose,
  } = useClassroomFormDrawer();

  return (
    <Drawer.Root
      open={showDrawer}
      onOpenChange={(value) => !value && handleClose()}
    >
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            ✨ {isEditClassroom ? "Editar" : "Criar"} turma
          </Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          {classroomError || isFetchingClassroom ? (
            <div className="flex items-center justify-center w-full h-full">
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
                  placeholder="EX: Turma de algoritmos 2026.2"
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
                    <CustomCombobox
                      {...restField}
                      name={restField.name}
                      label="Linguagens"
                      placeholder="Selecione as linguagens"
                      items={LIST_OF_LANGUAGES}
                      required
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
                      subTitle="Alunos verão a turma na tela inicial quando ativado."
                      disabled={!canEditClassroom}
                    />
                  )}
                />
              </div>
            </form>
          )}
        </Drawer.Body>

        {canEditClassroom && (
          <Drawer.Footer className="gap-2">
            <Button
              variantStyle="secondary"
              disabled={isSubmittingClassroom}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              disabled={!classroomFormState.isDirty}
              isLoading={isSubmittingClassroom}
              onClick={submitClassroom}
            >
              Salvar
            </Button>
          </Drawer.Footer>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
};

interface ClassroomFormTriggerButtonProps {
  children?: ReactNode;
  classroomId?: string | null;
}

const ClassroomFormTriggerButton = (
  { children, classroomId }: ClassroomFormTriggerButtonProps,
  ref?: any,
) => {
  const { openDrawer } = useTriggerClassroomFormDrawer();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() => openDrawer(classroomId)}
      aria-label={classroomId ? "Editar turma" : "Criar turma"}
    >
      {children}
    </Comp>
  );
};

const ClassroomForm = {
  Drawer: memo(ClassroomFormDrawer),
  TriggerButton: memo(forwardRef(ClassroomFormTriggerButton)),
};

export { ClassroomForm };

ClassroomForm.Drawer.displayName = "ClassroomFormDrawer";
ClassroomForm.TriggerButton.displayName = "ClassroomFormTriggerButton";
