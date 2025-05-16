import { useCallback, useMemo } from "react";
import {
  TeacherFormSchema,
  useTeacherFormSchema,
} from "../../schemas/teacherFormSchema";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useParams } from "next/navigation";
import {
  AddTeacherToClassroomBody,
  useAddTeacherToClassroom,
} from "../../hooks/useAddTeacherToClassroom";
import { useToast } from "@/hooks/useToast";
import { ClassroomKeys } from "../../classroomType";
import { useQueryClient } from "@tanstack/react-query";

export const useClassromTeacherForm = (
  teacherId?: string | null,
  onSuccessSubmitted?: () => void
) => {
  const isEdit = useMemo(() => !!teacherId, [teacherId]);
  const params = useParams<{ classroomId: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    handleClassroomTeacherFormSubmit,
    clearClassroomTeacherStates,
    resetClassroomTeacherForm,
    setClassroomTeacherFormError,
    triggerClassroomTeacherForm,
  } = useTeacherFormSchema();

  const { addTeacherToClassroom, isAddingTeacherToClass } =
    useAddTeacherToClassroom(params?.classroomId);

  const { loggedUser } = useAuth();

  const getHandledTeacherBody = useCallback((data: TeacherFormSchema) => {
    return {
      id: data?.value,
      canEditClassroom: data?.canEditClassroom,
      canManageTeachers: data?.canManageTeachers,
      canCreateList: data?.canCreateList,
      canEditList: data?.canEditList,
      canDeleteList: data?.canDeleteList,
      canManageExercises: data?.canManageExercises,
      canRemoveMember: data?.canRemoveMember,
    } as AddTeacherToClassroomBody;
  }, []);

  const handleSubmitClassroomTeacherForm = useCallback(
    (data: TeacherFormSchema) => {
      const handledTeacherBody = getHandledTeacherBody(data);
      const onSuccess = () => {
        clearClassroomTeacherStates();
        onSuccessSubmitted?.();
        toast({
          title: `Professor(a) ${
            isEdit ? "editado" : "adicionado"
          } com sucesso`,
          variant: "success",
        });
        if (!isEdit) {
          queryClient.resetQueries({
            queryKey: [ClassroomKeys.Details, params?.classroomId],
          });
        }
      };
      const onError = (erro?: any) => {
        const errorResponse = erro?.response;
        if (erro?.response?.status === 409) {
          setClassroomTeacherFormError("value", {
            message:
              errorResponse?.data?.description ||
              "Professor(a) já está vinculado(a) a turma",
          });
        }
        toast({
          title: `Erro ao ${isEdit ? "atualizar" : "adicionar"} professor(a)`,
          variant: "danger",
          direction: "bottom-right",
        });
      };
      addTeacherToClassroom(handledTeacherBody, { onSuccess, onError });
    },
    [
      isEdit,
      params,
      queryClient,
      setClassroomTeacherFormError,
      toast,
      onSuccessSubmitted,
      clearClassroomTeacherStates,
      getHandledTeacherBody,
      addTeacherToClassroom,
    ]
  );

  const isSubmitting = useMemo(
    () => isAddingTeacherToClass,
    [isAddingTeacherToClass]
  );

  return {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    submitClassroomTeacherForm: handleClassroomTeacherFormSubmit(
      handleSubmitClassroomTeacherForm
    ),
    loggedUser,
    isSubmitting,
  };
};
