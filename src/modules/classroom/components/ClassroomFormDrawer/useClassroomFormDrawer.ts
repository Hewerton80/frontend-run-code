import { useFetchClassroomById } from "@/modules/classroom/hooks/useFetchClassroomById";
import { useCallback, useEffect, useMemo } from "react";
import {
  ClassroomFormSchema,
  useClassroomFormSchema,
} from "../../schemas/classroomFormSchema";
import {
  ICreateClassroomBody,
  useCreateClassroom,
} from "../../hooks/useCreateClassroom";
import { useUpdateClassroom } from "../../hooks/useUpdateClassroom";
import { updateCachedClassroom } from "../../utils/updateCachedClassroom";
import { forceRefetchMyClassrooms } from "../../utils/forceRefetchMyClassrooms";
import { toast } from "@/hooks/useToast";
import { useTriggerClassroomFormDrawer } from "./useTriggerClassroomFormDrawer";

export const useClassroomFormDrawer = () => {
  const { classroomId, showDrawer, closeDrawer } =
    useTriggerClassroomFormDrawer();

  const isEditClassroom = useMemo(() => !!classroomId, [classroomId]);

  const { createClassroom, isCreatingClassroom } = useCreateClassroom();
  const { updateClassroom, isUpdatingClassroom } = useUpdateClassroom(
    classroomId!,
  );

  const {
    classroom: currentClassroom,
    classroomError,
    isFetchingClassroom,
    refetchClassroom,
  } = useFetchClassroomById(classroomId as string);

  const {
    classroomFormControl,
    classroomFormState,
    handleClassroomFormSubmit,
    registerClassroomForm,
    clearClassroomFormStates,
    resetClassroomForm,
  } = useClassroomFormSchema();

  const canEditClassroom = useMemo(() => {
    if (!isEditClassroom) return true;
    return currentClassroom?.myClassroomPermissions?.canEditClassroom;
  }, [currentClassroom, isEditClassroom]);

  const isSubmittingClassroom = useMemo(
    () => isCreatingClassroom || isUpdatingClassroom,
    [isCreatingClassroom, isUpdatingClassroom],
  );

  /** Popula o form quando os dados da turma são carregados (modo edição) */
  useEffect(() => {
    if (currentClassroom) {
      resetClassroomForm({
        name: currentClassroom?.name,
        languages:
          currentClassroom?.languages?.split(",")?.map((language) => ({
            label: language,
            value: language,
          })) || [],
        isVisible: currentClassroom?.status === 1,
        isAddTeachers: Number(currentClassroom?.teachers?.length) > 0,
      });
    }
  }, [resetClassroomForm, currentClassroom]);

  /** Reseta o form ao fechar o drawer */
  useEffect(() => {
    if (!showDrawer) {
      clearClassroomFormStates();
    }
  }, [showDrawer, clearClassroomFormStates]);

  const getHandleClassroomFormBody = useCallback(
    (data: ClassroomFormSchema) => {
      const handleClassroomFormBody: ICreateClassroomBody = {
        name: data.name,
        languages: data.languages.map((language) => language.value),
        status: data.isVisible ? 1 : 2,
      };
      return handleClassroomFormBody;
    },
    [],
  );

  const handleSubmitClassroom = useCallback(
    (data: ClassroomFormSchema) => {
      const handleClassroomFormBody = getHandleClassroomFormBody(data);

      const onSuccess = () => {
        closeDrawer();
        clearClassroomFormStates();
        toast.success(
          `Turma ${isEditClassroom ? "editada" : "criada"} com sucesso!`,
        );
        if (isEditClassroom) {
          const newClassroomValues = {
            name: handleClassroomFormBody.name,
            languages: handleClassroomFormBody.languages.join(","),
            status: handleClassroomFormBody.status,
          };
          updateCachedClassroom(currentClassroom?.uuid!, (oldData) => ({
            ...(oldData || {}),
            ...newClassroomValues,
          }));
          return;
        }
        forceRefetchMyClassrooms();
      };

      const onError = () =>
        toast.error(`Erro ao ${isEditClassroom ? "editar" : "criar"} turma`);

      if (isEditClassroom) {
        updateClassroom(handleClassroomFormBody, { onSuccess, onError });
        return;
      }
      createClassroom(handleClassroomFormBody, { onSuccess, onError });
    },
    [
      isEditClassroom,
      currentClassroom,
      clearClassroomFormStates,
      closeDrawer,
      updateClassroom,
      getHandleClassroomFormBody,
      createClassroom,
    ],
  );

  const handleClose = useCallback(() => {
    closeDrawer();
  }, [closeDrawer]);

  return {
    showDrawer,
    classroomFormState,
    classroomFormControl,
    isSubmittingClassroom,
    classroomError,
    isFetchingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    submitClassroom: handleClassroomFormSubmit(handleSubmitClassroom),
    registerClassroomForm,
    handleClose,
  };
};
