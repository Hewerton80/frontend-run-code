import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useCallback, useMemo } from "react";
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
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { ClassroomKeys } from "../../classroomType";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const useClassroomFormDialog = (classroomId?: string) => {
  const isEditClassroom = useMemo(() => !!classroomId, [classroomId]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { loggedUser } = useAuth();

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
    watchClassroomForm,
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
      const onSuccess = () => {
        router.push("/home");
        toast({
          title: `Turma ${
            currentClassroom ? "editada" : "criada"
          } com sucesso!`,
          variant: "success",
        });
        if (currentClassroom) {
          queryClient.resetQueries({
            queryKey: [ClassroomKeys.List],
          });
        }
      };
      const onError = () => {
        toast({
          title: `Erro ao ${currentClassroom ? "editar" : "criar"} turma`,
          variant: "danger",
          direction: "bottom-right",
        });
      };
      const handleClassroomFormBody = getHandleClassroomFormBody(data);
      if (currentClassroom) {
        updateClassroom(handleClassroomFormBody, { onSuccess, onError });
      } else {
        createClassroom(handleClassroomFormBody, { onSuccess, onError });
      }
    },
    [
      router,
      queryClient,
      currentClassroom,
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
    currentClassroom,
    loggedUser,
    errorClassroom,
    isLoadingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    clearClassroomFormStates,
    submitClassroom: handleClassroomFormSubmit(handleSubmitClassroom),
    registerClassroomForm,
  };
};
