"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Card } from "@/components/ui/cards/Card";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Controller } from "react-hook-form";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { FaRegTrashAlt } from "react-icons/fa";
import { AsyncTeacherSelect } from "@/modules/user/components/AsyncTeacherSelect";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { FormLabel } from "@/components/ui/forms/FormLabel";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { twMerge } from "tailwind-merge";
import { useManageClasroomTeachersForm } from "./useManageClasroomTeachersForm";
import { Highlight } from "@/components/ui/feedback/Highlight";
import { Fragment } from "react";
import { Alert } from "@/components/ui/feedback/Alert";

export const ManageTeachersForm = () => {
  const {
    teachers,
    classroomTeachersFormState,
    classroomTeachersFormControl,
    isSubmittingClassroom,
    loggedUser,
    currentClassroom,
    errorClassroom,
    isLoadingClassroom,
    canManageTeachers,
    refetchClassroom,
    removeTeacher,
    addTeacher,
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
            <Card.Title>👩‍🏫 Gerenciamento de professores</Card.Title>
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
            <div className="flex flex-col gap-4">
              {!canManageTeachers && (
                <Alert.Root variant="info">
                  <Alert.Title>
                    Você não tem permissão para editar os professores desta
                    turma.
                  </Alert.Title>
                  <Alert.Description>
                    Entre em contato com o professor responsável pela turma caso
                    precise fazer alguma alteração.
                  </Alert.Description>
                </Alert.Root>
              )}
              {teachers.map((teacher, index) => {
                const isAuthor =
                  teacher?.uuid === currentClassroom?.author?.uuid;
                const isLoggedUser = teacher?.uuid === loggedUser?.uuid;
                const isDisabled =
                  isAuthor || isLoggedUser || !canManageTeachers;
                console.log("value", teacher?.value, "label", teacher?.label);
                const showDivider =
                  teachers.length > 1 && index < teachers.length - 1;
                return (
                  <Fragment key={`${index}-teachers`}>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-4 overflow-visible">
                        <div className="flex flex-col w-full">
                          <Controller
                            control={classroomTeachersFormControl}
                            name={`teachers.${index}.value`}
                            render={({
                              field: { onChange, ...restField },
                              fieldState,
                            }) => (
                              <>
                                <div className="flex gap-2 mb-2">
                                  <FormLabel className="mb-0" required>
                                    Professor(a)
                                  </FormLabel>
                                  {isDisabled ? (
                                    <div className="flex gap-2">
                                      {isAuthor && (
                                        <Badge variant="dark">Autor(a)</Badge>
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
                                  defaultOptions={[
                                    {
                                      label: teacher?.label!,
                                      value: teacher?.value,
                                    },
                                  ]}
                                  onChange={(option) => onChange(option?.value)}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                            control={classroomTeachersFormControl}
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
                      </div>
                      {teachers.length > 1 && canManageTeachers && (
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
                    {showDivider && (
                      <div className="w-full h-[1px] my-4 bg-border" />
                    )}
                  </Fragment>
                );
              })}
              {canManageTeachers && (
                <Tooltip textContent="Adicionar professor">
                  <Highlight active={teachers.length === 0}>
                    <IconButton onClick={addTeacher} icon={<FaPlus />} />
                  </Highlight>
                </Tooltip>
              )}
            </div>
          </Card.Body>
          {!errorClassroom && !isLoadingClassroom && canManageTeachers && (
            <Card.Footer className="gap-4" orientation="end">
              <Button
                fullWidth
                disabled={!classroomTeachersFormState.isDirty}
                type="submit"
                isLoading={isSubmittingClassroom}
              >
                Salvar
              </Button>
            </Card.Footer>
          )}
        </form>
        {/* )} */}
      </Card.Root>
    </div>
  );
};
