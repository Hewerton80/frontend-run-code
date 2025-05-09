"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Controller } from "react-hook-form";
import { Switch } from "@/components/ui/forms/Switch";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { FaRegTrashAlt } from "react-icons/fa";
import { MultSelect } from "@/components/ui/forms/selects";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { PingWrapper } from "@/components/ui/feedback/Ping";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { twMerge } from "tailwind-merge";
import { useManageClasroomTeachersForm } from "./useManageClasroomTeachersForm";

export const ManageTeachersForm = () => {
  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    isAddTeachers,
    languagesOptions,
    isSubmittingClassroom,
    loggedUser,
    currentClassroom,
    errorClassroom,
    isLoadingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    removeTeacher,
    addTeacher,
    registerClassroomForm,
    createClassroom,
  } = useManageClasroomTeachersForm();

  // if (errorClassroom) {
  //   return <FeedBackError onTryAgain={refetchClassroom} />;
  // }

  // if (isLoadingClassroom) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-full">
  //       <Spinner size={64} />
  //     </div>
  //   );
  // }

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
      <BackLink href="/home">Voltar para Home</BackLink>
      <Card.Root className="overflow-visible" asChild>
        <form onSubmit={createClassroom}>
          <Card.Header>
            <Card.Title>
              🏫 {isEditClassroom ? "Editar" : "Criar"} turma
            </Card.Title>
          </Card.Header>
          {(errorClassroom || isLoadingClassroom) && (
            <div
              className={twMerge(
                "bg-background flex items-center justify-center w-full h-full min-h-[500px]"
              )}
            >
              {errorClassroom && (
                <FeedBackError onTryAgain={refetchClassroom} />
              )}
              {isLoadingClassroom && <Spinner size={64} />}
            </div>
          )}
          <Card.Body
            className={errorClassroom || isLoadingClassroom ? "hidden" : ""}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
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
                      disabled={!canEditClassroom}
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
                      disabled={!canEditClassroom}
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
                      disabled={!canEditClassroom}
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
                    {teachers.map((teacher, index) => {
                      const isAuthor =
                        teacher?.uuid === currentClassroom?.author?.uuid;
                      const isLoggedUser = teacher?.uuid === loggedUser?.uuid;
                      const isDisabled =
                        isAuthor || isLoggedUser || !canEditClassroom;
                      return (
                        <div
                          key={`${index}-teachers`}
                          className="flex items-center gap-4"
                        >
                          <Card.Root className="flex flex-col gap-4 px-3 py-4 overflow-visible">
                            <div className="flex flex-col w-full">
                              <Controller
                                control={classroomFormControl}
                                name={`teachers.${index}.value`}
                                render={({
                                  field: { onChange, ...restField },
                                  fieldState,
                                }) => (
                                  <>
                                    <div className="flex gap-2 mb-2">
                                      <FormLabel className="mb-0" required>
                                        Nome do professor
                                      </FormLabel>
                                      {isDisabled ? (
                                        <div className="flex gap-2">
                                          {isAuthor && (
                                            <Badge variant="dark">
                                              Autor(a)
                                            </Badge>
                                          )}
                                          {isLoggedUser && (
                                            <Badge variant="dark">Você</Badge>
                                          )}
                                        </div>
                                      ) : undefined}
                                    </div>
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
                                      onChange={(option) =>
                                        onChange(option?.value)
                                      }
                                      placeholder="Nome do professor"
                                      required
                                      error={fieldState.error?.message}
                                      disabled={isDisabled}
                                    />
                                  </>
                                )}
                              />
                            </div>
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    label="Pode remover aluno(a)s"
                                    disabled={isDisabled}
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
                                disabled={isDisabled}
                              />
                            </Tooltip>
                          )}
                        </div>
                      );
                    })}
                    {canEditClassroom && (
                      <Tooltip textContent="Adicionar professor">
                        <PingWrapper
                          variant="light"
                          active={teachers.length === 0}
                        >
                          <IconButton onClick={addTeacher} icon={<FaPlus />} />
                        </PingWrapper>
                      </Tooltip>
                    )}
                  </div>
                </>
              )}
            </div>
          </Card.Body>
          {!errorClassroom && !isLoadingClassroom && canEditClassroom && (
            <Card.Footer className="gap-4" orientation="end">
              <Button
                fullWidth
                disabled={!classroomFormState.isDirty}
                type="submit"
                isLoading={isSubmittingClassroom}
              >
                {isEditClassroom ? "Editar" : "Criar"}
              </Button>
            </Card.Footer>
          )}
        </form>
        {/* )} */}
      </Card.Root>
    </div>
  );
};
