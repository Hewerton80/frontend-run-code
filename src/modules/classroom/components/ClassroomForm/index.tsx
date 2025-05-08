"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Input } from "@/components/ui/forms/inputs/Input";
import { useClassroomForm } from "./useClassroomForm";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { Fragment } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MultSelect } from "@/components/ui/forms/selects";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { IoArrowBack } from "react-icons/io5";
import { BackLink } from "@/components/ui/navigation/BackLink";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";

export const ClassroomForm = () => {
  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    isAddTeachers,
    languagesOptions,
    isSubmittingClassroom,
    currentClassroom,
    removeTeacher,
    addTeacher,
    registerClassroomForm,
    createClassroom,
  } = useClassroomForm();

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      {/* <Breadcrumbs
        items={[
          { label: "🏠 Home", href: "/home" },
          { label: "🏫 Criar turma" },
        ]}
      /> */}
      {/* <Button leftIcon={<IoArrowBack />} variantStyle="secondary">
        Voltar para home
      </Button> */}
      <BackLink href="/home">Voltar para home</BackLink>
      <Card.Root className="overflow-visible" asChild>
        <form onSubmit={createClassroom}>
          <Card.Header>
            <Card.Title>🏫 Criar turma</Card.Title>
          </Card.Header>

          <Card.Body>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Input
                  {...registerClassroomForm("name")}
                  id={registerClassroomForm("name").name}
                  label="Nome"
                  placeholder="EX: Turma de lógica 2025.2"
                  required
                  error={classroomFormState.errors.name?.message}
                />
              </div>
              <div className="col-span-6">
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
                    />
                  )}
                />
              </div>
              <div className="flex items-end col-span-12">
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
                    />
                  )}
                />
              </div>
              <div className="flex items-end col-span-12">
                <Controller
                  name="isAddTeachers"
                  control={classroomFormControl}
                  render={({ field: { onChange, value, ...restField } }) => (
                    <Switch
                      {...restField}
                      id={restField.name}
                      checked={value}
                      onCheckedChange={onChange}
                      label="Adicionar outros professores"
                    />
                  )}
                />
              </div>
              {isAddTeachers && (
                <>
                  <h6 className="font-medium text-base col-span-12">
                    👩‍🏫 Gerenciamento de professores
                  </h6>
                  <div className="flex flex-col col-span-12 gap-3">
                    {teachers.map((teacher, index) => (
                      <Fragment key={`${index}-teachers`}>
                        {/* <div className="grid"> */}
                        <div className="flex items-center gap-4">
                          <Card.Root className="flex flex-col gap-4 px-3 py-4 overflow-visible">
                            <Controller
                              control={classroomFormControl}
                              name={`teachers.${index}.value`}
                              render={({
                                field: { onChange, ...restField },
                                fieldState,
                              }) => (
                                <AsyncTeacherSelect
                                  {...restField}
                                  id={restField.name}
                                  defaultOptions={
                                    currentClassroom
                                      ? [
                                          {
                                            label: teacher?.label!,
                                            value: teacher?.value,
                                          },
                                        ]
                                      : []
                                  }
                                  label="Nome do professor"
                                  onChange={(option) => onChange(option?.value)}
                                  placeholder="Nome do professor"
                                  required
                                  error={fieldState.error?.message}
                                />
                              )}
                            />
                            <div className="flex flex-wrap gap-x-5 gap-y-4">
                              <Controller
                                name={`teachers.${index}.canEditClassroom`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode editar a turma"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canManageTeachers`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode gerenciar professores"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canCreateList`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode criar lista"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canEditList`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode editar lista"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canDeleteList`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode deletar lista"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canManageExercises`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode gerenciar exercícios"
                                  />
                                )}
                              />
                              <Controller
                                name={`teachers.${index}.canRemoveMember`}
                                control={classroomFormControl}
                                render={({
                                  field: { onChange, value, ...restField },
                                }) => (
                                  <Checkbox
                                    {...restField}
                                    id={restField.name}
                                    checked={value}
                                    onCheckedChange={onChange}
                                    label="Pode remover membro"
                                  />
                                )}
                              />
                            </div>
                          </Card.Root>
                          {teachers.length > 1 && (
                            <Tooltip textContent="Remover professor">
                              <IconButton
                                variantStyle="danger"
                                onClick={() => removeTeacher(index)}
                                icon={<FaRegTrashAlt />}
                              />
                            </Tooltip>
                          )}
                        </div>
                        {/* </div> */}
                      </Fragment>
                    ))}
                    <Tooltip textContent="Adicionar professor">
                      <IconButton onClick={addTeacher} icon={<FaPlus />} />
                    </Tooltip>
                  </div>
                </>
              )}
            </div>
          </Card.Body>
          <Card.Footer className="gap-4" orientation="end">
            {/* <Button
              disabled={!classroomFormState.isDirty || isSubmittingClassroom} }
              variantStyle="secondary"
              type="button"
            >
              Desfazer alterações
            </Button> */}
            <Button
              fullWidth
              disabled={!classroomFormState.isDirty}
              type="submit"
              isLoading={isSubmittingClassroom}
            >
              {currentClassroom ? "Editar" : "Criar"}
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </div>
  );
};
