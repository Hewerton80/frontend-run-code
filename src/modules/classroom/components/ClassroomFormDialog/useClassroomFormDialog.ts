import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useCallback, useEffect, useMemo } from "react";
import {
  ClassroomFormSchema,
  useClassroomFormSchema,
} from "../../schemas/classroomFormSchema";
import {
  CreateClassroomBody,
  useCreateClassroom,
} from "../../hooks/useCreateClassroom";
import { useUpdateClassroom } from "../../hooks/useUpdateClassroom";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { ClassroomKeys, IClassroom } from "../../classroomType";

export const useClassroomFormDialog = (
  classroomId?: string | null,
  onSuccessSubmitted?: () => void
) => {
  const isEditClassroom = useMemo(() => !!classroomId, [classroomId]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { createClassroom, isCreatingClassroom } = useCreateClassroom();
  const { updateClassroom, isUpdatingClassroom } = useUpdateClassroom(
    classroomId!
  );
  const {
    classroom: currentClassroom,
    errorClassroom,
    isLoadingClassroom,
    refetchClassroom,
  } = useGetClassroomById(classroomId as string);

  const {
    classroomFormControl,
    classroomFormState,
    handleClassroomFormSubmit,
    registerClassroomForm,
    clearClassroomFormStates,
    resetClassroomForm,
  } = useClassroomFormSchema();

  const languagesOptions = useMemo(() => {
    return Object.keys(languagesConfig).map((key) => ({
      label: key,
      value: key,
    }));
  }, []);

  const canEditClassroom = useMemo(() => {
    if (!isEditClassroom) return true;
    return currentClassroom?.myClassroomPermissions?.canEditClassroom;
  }, [currentClassroom, isEditClassroom]);

  const isSubmittingClassroom = useMemo(
    () => isCreatingClassroom || isUpdatingClassroom,
    [isCreatingClassroom, isUpdatingClassroom]
  );

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

  const getHandleClassroomFormBody = useCallback(
    (data: ClassroomFormSchema) => {
      const handleClassroomFormBody: CreateClassroomBody = {
        name: data.name,
        languages: data.languages.map((language) => language.value),
        status: data.isVisible ? 1 : 2,
        // teachers: data?.isAddTeachers
        //   ? data.teachers.map((teacher) => ({
        //       id: +teacher.value,
        //       canEditClassroom: teacher.canEditClassroom,
        //       canManageTeachers: teacher.canManageTeachers,
        //       canCreateList: teacher.canCreateList,
        //       canEditList: teacher.canEditList,
        //       canDeleteList: teacher.canDeleteList,
        //       canManageExercises: teacher.canManageExercises,
        //       canRemoveMember: teacher.canRemoveMember,
        //     }))
        //   : [],
      };
      return handleClassroomFormBody;
    },
    []
  );

  const handleSubmitClassroom = useCallback(
    (data: ClassroomFormSchema) => {
      const handleClassroomFormBody = getHandleClassroomFormBody(data);

      const onSuccess = () => {
        onSuccessSubmitted?.();
        clearClassroomFormStates();
        toast({
          title: `Turma ${isEditClassroom ? "editada" : "criada"} com sucesso!`,
          variant: "success",
        });
        if (isEditClassroom) {
          const newClassroomValues = {
            name: handleClassroomFormBody.name,
            languages: handleClassroomFormBody.languages.join(","),
            status: handleClassroomFormBody.status,
          };
          queryClient.setQueryData(
            [ClassroomKeys.Details, currentClassroom?.uuid],
            (oldData: IClassroom | undefined) => ({
              ...(oldData || {}),
              ...newClassroomValues,
            })
          );
          queryClient.setQueryData(
            [ClassroomKeys.List],
            (oldData: IClassroom[] | undefined) => {
              const foundIndex = (oldData || [])?.findIndex(
                (oldClassroom) => oldClassroom.uuid === classroomId
              );
              if (foundIndex !== -1 && oldData) {
                oldData[foundIndex] = {
                  ...oldData[foundIndex],
                  ...newClassroomValues,
                };
              }
              return oldData;
            }
          );
        } else {
          queryClient.resetQueries({ queryKey: [ClassroomKeys.List] });
        }
      };
      const onError = () => {
        toast({
          title: `Erro ao ${isEditClassroom ? "editar" : "criar"} turma`,
          variant: "danger",
          direction: "bottom-right",
        });
      };
      if (isEditClassroom) {
        updateClassroom(handleClassroomFormBody, {
          onSuccess,
          onError,
        });
      } else {
        createClassroom(handleClassroomFormBody, {
          onSuccess,
          onError,
        });
      }
    },
    [
      queryClient,
      isEditClassroom,
      classroomId,
      currentClassroom,
      clearClassroomFormStates,
      onSuccessSubmitted,
      updateClassroom,
      toast,
      getHandleClassroomFormBody,
      createClassroom,
    ]
  );

  return {
    classroomFormState,
    classroomFormControl,
    languagesOptions,
    isSubmittingClassroom,
    errorClassroom,
    isLoadingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    submitClassroom: handleClassroomFormSubmit(handleSubmitClassroom),
    registerClassroomForm,
  };
};
