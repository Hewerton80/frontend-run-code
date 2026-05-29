import { Button } from "@/components/ui/buttons/Button";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { Resizable } from "@/components/ui/dataDisplay/Resizable";
import { Input } from "@/components/ui/forms/inputs/Input";
import { EnterMultSelect } from "@/components/ui/forms/selects";
import { Switch } from "@/components/ui/forms/Switch";
import { Textarea } from "@/components/ui/forms/Textarea/Textarea";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { IDE } from "@/modules/submission/components/IDE";
import { BsTrash } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useExerciseForm } from "./useExerciseForm";
import { useMemo } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Alert } from "@/components/ui/feedback/Alert";
import { FormHelperText } from "@/components/ui/forms/FormHelperText";
import { ROUTES } from "@/routes/routes";

export const ExerciseForm = () => {
  const {
    exerciseFormSchemaMethods,
    handleSubmitExercise,
    isSubmittingExercise,
  } = useExerciseForm();

  const { control, register, formState } = useMemo(
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
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          // isLoading={isExercisesLoading}
          items={[
            { label: "🧩 Exercícios", href: ROUTES.EXERCISES },
            {
              label: "Criar Exercício",
            },
          ]}
        />
        <div className="flex justify-between items-end">
          <BackLink to={ROUTES.EXERCISES}>
            Voltar para lista de exercícios
          </BackLink>
          <div className="flex gap-4">
            <Button
              variantStyle="secondary"
              disabled={isSubmittingExercise || !formState.isDirty}
              // onClick={handleResetExercisesForm}
            >
              Desfazer alterações
            </Button>
            <Button
              disabled={!formState.isDirty}
              onClick={handleSubmitExercise}
              isLoading={isSubmittingExercise}
            >
              Salvar
            </Button>
          </div>
        </div>
        <Resizable.Group
          className={twMerge(
            "flex size-full min-h-[468px] rounded-lg overflow-hidden border",
            "border-l-3 border-l-info rounded-l-none",
          )}
        >
          <Resizable.Panel
            defaultSize={30}
            minSize={15}
            className="h-full w-full flex-3/4"
          >
            <form
              className="flex flex-col gap-4 p-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* <Input
                  {...registerClassroomForm("name")}
                  id={registerClassroomForm("name").name}
                  label="Nome"
                  placeholder="EX: Turma de lógica 2025.2"
                  required
                  error={classroomFormState.errors.name?.message}
                  disabled={!canEditClassroom}
                /> */}
              <Input
                {...register("title")}
                id={register("title").name}
                required
                label="Título"
                placeholder="Digite o título do exercício"
                error={formState.errors.title?.message}
              />
              <Textarea
                {...register("description")}
                id={register("description").name}
                required
                label="Descrição"
                placeholder="Digite a descrição do exercício"
                error={formState.errors.description?.message}
              />
              <div className="flex flex-col">
                <DivTable.Container
                  className={twMerge(testCasesError && "border-danger")}
                >
                  <DivTable.Row header>
                    <DivTable.Data>Entradas de Teste (inputs)</DivTable.Data>
                    <DivTable.Data>Saídas Esperadas (outputs)</DivTable.Data>
                    <DivTable.Data>Público</DivTable.Data>
                    {/* <DivTable.Data></DivTable.Data> */}
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
                                <EnterMultSelect
                                  {...field}
                                  autoFocus={false}
                                  id={field.name}
                                  placeholder={`Entrada de Teste (${
                                    index + 1
                                  })`}
                                  error={fieldState.error?.message}
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
                                id={field.name}
                                placeholder={`Entrada de Teste (${index + 1})`}
                                error={fieldState.error?.message}
                                required
                              />
                              // <EnterMultSelect
                              //   {...field}
                              //   autoFocus={false}
                              //   id={field.name}
                              //   placeholder={`Entrada de Teste (${
                              //     index + 1
                              //   })`}
                              //   error={fieldState.error?.message}
                              // />
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
                        {/* <DivTable.Data>
                      
                    </DivTable.Data> */}
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
                              input: [],
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
                          ▶️ Deve conter ao menos um caso de teste público e um
                          privado;
                        </Alert.Description>
                      </Alert.Root>
                    </DivTable.Data>
                  </DivTable.Row>
                </DivTable.Container>
                {testCasesError && (
                  <FormHelperText>{testCasesError}</FormHelperText>
                )}
              </div>
              {/*  <div className="flex flex-col h-full gap-4">
                <p>Output:</p>
             {isRunningCode && <ThreeDotsLoading />}
                {runCodeResponse && (
                  <TerminalCode content={runCodeResponse?.output || ""} />
                )}
                {runCodeError && (
                  <TerminalCode content={runCodeError?.description || ""} />
                )}
              </div> */}
            </form>
          </Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel
            defaultSize={20}
            minSize={15}
            className="flex flex-1/4 w-full flex-col col-span-8 h-full gap-4"
          >
            <div className="flex flex-col gap-4 p-4">
              <IDE
              // value={editorValue} onChange={setEditorValue}
              />
              <div className="flex justify-end">
                <Button
                  variantStyle="outline"
                  // isLoading={isRunningCode} onClick={handleSubmit}
                >
                  Testar
                </Button>
              </div>
            </div>
          </Resizable.Panel>
        </Resizable.Group>
      </div>
    </>
  );
};
