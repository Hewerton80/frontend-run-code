import { useCallback, useEffect, useMemo } from "react";
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
import { useGetClassroomUserById } from "../../hooks/useGetClassroomUserById";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import {
  UpdateTeacherInClassroomBody,
  useUpdateTeacherInClassroom,
} from "../../hooks/updateTeacherInClassroom";

export const useClassromTeacherFormDialog = (
  teacherId?: string | null,
  onSuccessSubmitted?: () => void
) => {
  const isEdit = useMemo(() => !!teacherId, [teacherId]);
  const params = useParams<{ classroomId: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { loggedUser } = useAuth();

  const { classroom } = useGetClassroomById(params?.classroomId);

  const {
    classroomUser,
    classroomUserError,
    isLoadingClassroomUser,
    refetchClassroomUser,
  } = useGetClassroomUserById(params?.classroomId, teacherId);

  const isClassroomAuthor = useMemo(() => {
    return classroomUser?.uuid === classroom?.author?.uuid;
  }, [classroomUser, classroom]);

  const isMe = useMemo(() => {
    return loggedUser?.uuid === teacherId;
  }, [loggedUser, teacherId]);

  const canEditClassroomUser = useMemo(() => {
    if (!isEdit) return true;
    if (isMe) return false;
    if (isClassroomAuthor) return false;
    return classroom?.myClassroomPermissions?.canManageTeachers;
  }, [isEdit, isMe, classroom, isClassroomAuthor]);

  const {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    handleClassroomTeacherFormSubmit,
    clearClassroomTeacherStates,
    resetClassroomTeacherForm,
    setClassroomTeacherFormError,
  } = useTeacherFormSchema();

  const { addTeacherToClassroom, isAddingTeacherToClassroom } =
    useAddTeacherToClassroom(params?.classroomId);

  const { updateTeacherInClassroom, isUpdatingTeacherInClassroom } =
    useUpdateTeacherInClassroom(params?.classroomId, teacherId as string);

  useEffect(() => {
    if (classroomUser) {
      resetClassroomTeacherForm({
        value: classroomUser?.uuid,
        label: `${classroomUser?.email} - ${classroomUser?.name} ${classroomUser?.surname}`,
        canEditClassroom: classroomUser?.canEditClassroom,
        canManageTeachers: classroomUser?.canManageTeachers,
        canCreateList: classroomUser?.canCreateList,
        canEditList: classroomUser?.canEditList,
        canDeleteList: classroomUser?.canDeleteList,
        canManageExercises: classroomUser?.canManageExercises,
        canRemoveMember: classroomUser?.canRemoveMember,
      });
    }
  }, [resetClassroomTeacherForm, classroomUser]);

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
    } as AddTeacherToClassroomBody & UpdateTeacherInClassroomBody;
  }, []);

  const handleSubmitClassroomTeacherForm = useCallback(
    (data: TeacherFormSchema) => {
      const handledTeacherBody = getHandledTeacherBody(data);
      const onSuccess = () => {
        clearClassroomTeacherStates();
        onSuccessSubmitted?.();
        toast({
          title: `Professor(a) ${
            isEdit ? "editado(a)" : "adicionado(a)"
          } com sucesso`,
          variant: "success",
        });
        if (!isEdit) {
          queryClient.resetQueries({
            queryKey: [ClassroomKeys.Users, params?.classroomId],
          });
        }
      };
      const onError = (erro?: any) => {
        const errorResponse = erro?.response;
        if (errorResponse?.status === 409) {
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
      if (isEdit) {
        return updateTeacherInClassroom(handledTeacherBody, {
          onSuccess,
          onError,
        });
      }
      addTeacherToClassroom(handledTeacherBody, { onSuccess, onError });
    },
    [
      isEdit,
      params,
      queryClient,
      setClassroomTeacherFormError,
      updateTeacherInClassroom,
      toast,
      onSuccessSubmitted,
      clearClassroomTeacherStates,
      getHandledTeacherBody,
      addTeacherToClassroom,
    ]
  );

  const isSubmitting = useMemo(
    () => isAddingTeacherToClassroom || isUpdatingTeacherInClassroom,
    [isAddingTeacherToClassroom, isUpdatingTeacherInClassroom]
  );

  return {
    classroomTeacherFormControl,
    classroomTeacherFormState,
    isSubmitting,
    classroomUser,
    classroomUserError,
    isLoadingClassroomUser,
    isEdit,
    classroom,
    canEditClassroomUser,
    submitClassroomTeacherForm: handleClassroomTeacherFormSubmit(
      handleSubmitClassroomTeacherForm
    ),
    refetchClassroomUser,
  };
};
