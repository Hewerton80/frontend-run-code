import { Drawer } from "@/components/ui/overlay/Drawer";
import { useExerciseFormDrawer } from "./useExerciseFormDrawer";
import { useTriggerExerciseFormDrawer } from "./useTriggerExerciseFormDrawer";
import { forwardRef, memo, ReactNode, useMemo } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { ExerciseStatus } from "../../exerciseTypes";
import { Button } from "@/components/ui/buttons/Button";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { Slot } from "@radix-ui/react-slot";
import { Input } from "@/components/ui/forms/inputs/Input";
import { RichText } from "@/components/ui/forms/RichText";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { Textarea } from "@/components/ui/forms/Textarea";
import { Switch } from "@/components/ui/forms/Switch";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { BsTrash } from "react-icons/bs";
import { Alert } from "@/components/ui/feedback/Alert";
import { FormHelperText } from "@/components/ui/forms/FormHelperText";
import { cn } from "@/utils/cn";

const ExerciseFormDrawer = () => {
  const {
    showExerciseFormDrawer,
    handleCloseExerciseFormDrawer,
    exerciseFormSchemaMethods,
    handleSubmitExercise,
    isSubmittingExercise,
    isFetchingExercise,
  } = useExerciseFormDrawer();

  const { control, formState } = useMemo(
    () => exerciseFormSchemaMethods,
    [exerciseFormSchemaMethods],
  );

  const {
    fields: testCases,
    append: addTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    name: "testCases",
    control,
  });

  const testCasesError = useMemo(
    () => formState.errors.testCases?.["root"]?.message,
    [formState.errors],
  );

  return (
    <>
      <Drawer.Root
        open={showExerciseFormDrawer}
        onOpenChange={(value) => !value && handleCloseExerciseFormDrawer()}
      >
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Editar Exercício</Drawer.Title>
          </Drawer.Header>

          <Drawer.Body className="p-4">
            {isFetchingExercise ? (
              <div className="flex items-center justify-center w-full h-full">
                <Spinner size={64} />
              </div>
            ) : (
              <form
                className="grid grid-cols-1 gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Controller
                  control={control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      id={field.name}
                      required
                      label="Título"
                      placeholder="Digite o título do exercício"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({
                    field: { value, onChange, ...field },
                    fieldState,
                  }) => (
                    <>
                      <RichText
                        {...field}
                        id={field.name}
                        html={value}
                        onChange={(val) => onChange(val.html)}
                        label="Descrição"
                        // placeholder="Digite a descrição do exercício"
                        required
                        error={fieldState.error?.message}
                      />
                    </>
                  )}
                />
                <div className="flex flex-col">
                  <p className="mb-2 text-sm">Casos de teste:</p>

                  <DivTable.Container
                    className={cn(testCasesError && "border-danger")}
                  >
                    <DivTable.Row header>
                      <DivTable.Data>Entradas de Teste (inputs)</DivTable.Data>
                      <DivTable.Data>Saídas Esperadas (outputs)</DivTable.Data>
                      <DivTable.Data>Público</DivTable.Data>
                    </DivTable.Row>
                    {testCases.map((_, index) => {
                      const isFirst = index === 0;
                      return (
                        <DivTable.Row
                          disableAccordion
                          key={`test-case-row-${index}-list`}
                        >
                          <DivTable.Data>
                            <div className="w-full">
                              <Controller
                                name={`testCases.${index}.input`}
                                control={control}
                                render={({ field, fieldState }) => (
                                  <Textarea
                                    {...field}
                                    textareaClassName="field-sizing-content resize-none"
                                    id={field.name}
                                    placeholder={`Input (${index + 1})`}
                                    error={fieldState.error?.message}
                                    required
                                  />
                                )}
                              />
                            </div>
                          </DivTable.Data>
                          <DivTable.Data>
                            <Controller
                              name={`testCases.${index}.expectedOutput`}
                              control={control}
                              render={({ field, fieldState }) => (
                                <Textarea
                                  {...field}
                                  textareaClassName="field-sizing-content resize-none"
                                  id={field.name}
                                  placeholder={`Output (${index + 1})`}
                                  error={fieldState.error?.message}
                                  required
                                />
                              )}
                            />
                          </DivTable.Data>
                          <DivTable.Data className="gap-8 justify-between">
                            <Controller
                              name={`testCases.${index}.isPublic`}
                              control={control}
                              render={({
                                field: { onChange, value, ...restField },
                              }) => (
                                <Switch
                                  {...restField}
                                  name={restField.name}
                                  id={restField.name}
                                  checked={value}
                                  onCheckedChange={onChange}
                                />
                              )}
                            />
                            {!isFirst && (
                              <Tooltip textContent="Remover caso de teste">
                                <IconButton
                                  variantStyle="danger"
                                  icon={<BsTrash />}
                                  onClick={() => removeTestCase(index)}
                                />
                              </Tooltip>
                            )}
                          </DivTable.Data>
                        </DivTable.Row>
                      );
                    })}
                    <DivTable.Row
                      disableAccordion
                      className="border-t-transparent"
                    >
                      <DivTable.Data className="flex flex-col items-end gap-4">
                        <Tooltip textContent="Adicionar novo caso de teste">
                          <Button
                            onClick={() =>
                              addTestCase({
                                input: "",
                                expectedOutput: "",
                                isPublic: false,
                              })
                            }
                            variantStyle="outline"
                          >
                            Adicionar
                          </Button>
                        </Tooltip>
                        <Alert.Root variant="info">
                          <Alert.Title>
                            Critérios para Casos de testes
                          </Alert.Title>
                          <Alert.Description>
                            ▶️ Deve conter ao menos 3 casos de teste;
                            <br />
                            ▶️ Deve conter ao menos um caso de teste público e
                            um privado;
                          </Alert.Description>
                        </Alert.Root>
                      </DivTable.Data>
                    </DivTable.Row>
                  </DivTable.Container>
                  {testCasesError && (
                    <FormHelperText>{testCasesError}</FormHelperText>
                  )}
                </div>
              </form>
            )}
          </Drawer.Body>
          <Drawer.Footer>
            <Button
              fullWidth
              disabled={!formState.isDirty}
              onClick={() => handleSubmitExercise(ExerciseStatus.PUBLISHED)}
              isLoading={isSubmittingExercise}
            >
              Salvar alterações
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

interface ExerciseFormTriggerProps {
  children?: ReactNode;
  exerciseUuid: string | null;
}

const ExerciseFormTrigger = (
  { children, exerciseUuid }: ExerciseFormTriggerProps,
  ref?: any,
) => {
  const { showExerciseFormDrawerWithExerciseId } =
    useTriggerExerciseFormDrawer();

  const Comp = Slot;

  return (
    <Comp
      ref={ref}
      onClick={() => showExerciseFormDrawerWithExerciseId(exerciseUuid || null)}
      aria-label={exerciseUuid ? "Editar Exercício" : "Criar Exercício"}
    >
      {children}
    </Comp>
  );
};

const ExerciseForm = {
  Drawer: memo(ExerciseFormDrawer),
  Trigger: memo(forwardRef(ExerciseFormTrigger)),
};

export { ExerciseForm };

ExerciseForm.Drawer.displayName = "ExerciseFormDrawer";
ExerciseForm.Trigger.displayName = "ExerciseFormTrigger";
