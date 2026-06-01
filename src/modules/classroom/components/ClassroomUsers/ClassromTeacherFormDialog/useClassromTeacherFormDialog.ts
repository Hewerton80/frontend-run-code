import { useCallback, useEffect, useMemo } from "react";
import {
  TeacherFormSchema,
  useTeacherFormSchema,
} from "../../../schemas/teacherFormSchema";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useParams } from "react-router-dom";
import {
  type IAddTeacherToClassroomBody as AddTeacherToClassroomBody,
  useAddTeacherToClassroom,
} from "../../../hooks/useAddTeacherToClassroom";
import { useToast } from "@/hooks/useToast";
import { useFetchClassroomUserById } from "../../../hooks/useFetchClassroomUserById";
import {
  type IUpdateTeacherInClassroomBody as UpdateTeacherInClassroomBody,
  useUpdateTeacherInClassroom,
} from "../../../hooks/useUpdateTeacherInClassroom";
import { useGetCachedClassrom } from "../../../hooks/useGetCachedClassrom";
import { useTriggerClassroomTeacherFormDialog } from "./useTriggerClassroomTeacherFormDialog";
import { forceRefetchMyClassroomUsers } from "@/modules/classroom/utils/forceRefetchMyClassroomUsers";
import { updateCachedClassroomUserDetail } from "@/modules/classroom/utils/updateCachedClassroomUserDatail";
import { usePagination } from "@/hooks/usePagination";

export const useClassromTeacherFormDialog = () => {
  const {
    teacherIdToEdit: teacherId,
    showClassroomTeacherFormDialog,
    closeClassroomTeacherFormDialog,
  } = useTriggerClassroomTeacherFormDialog();

  const isEdit = useMemo(() => !!teacherId, [teacherId]);
  const params = useParams<{ classroomId: string }>();
  const { goToPage } = usePagination();

  const { toast } = useToast();
  const { loggedUser } = useLoggedUser();

  const { cachedClassroom: classroom } = useGetCachedClassrom(
    params?.classroomId!,
  );

  const {
    classroomUser,
    classroomUserError,
    isFetchingClassroomUser: isLoadingClassroomUser,
    refetchClassroomUser,
  } = useFetchClassroomUserById(params?.classroomId!, teacherId);

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
    useAddTeacherToClassroom(params?.classroomId!);

  const { updateTeacherInClassroom, isUpdatingTeacherInClassroom } =
    useUpdateTeacherInClassroom(params?.classroomId!, teacherId as string);

  useEffect(() => {
    if (!showClassroomTeacherFormDialog) return;
    if (classroomUser) {
      console.log("resetando form com classroomUser", classroomUser);
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
  }, [
    showClassroomTeacherFormDialog,
    resetClassroomTeacherForm,
    classroomUser,
  ]);

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

  const handleClose = useCallback(() => {
    closeClassroomTeacherFormDialog();
    clearClassroomTeacherStates();
  }, [closeClassroomTeacherFormDialog, clearClassroomTeacherStates]);

  const handleSubmitClassroomTeacherForm = useCallback(
    (data: TeacherFormSchema) => {
      const handledTeacherBody = getHandledTeacherBody(data);
      const onSuccess = () => {
        clearClassroomTeacherStates();
        handleClose();
        toast({
          title: `Professor(a) ${
            isEdit ? "editado(a)" : "adicionado(a)"
          } com sucesso`,
          variant: "success",
        });
        if (isEdit) {
          updateCachedClassroomUserDetail(teacherId!, (oldData) => ({
            ...(oldData || {}),
            canEditClassroom: handledTeacherBody.canEditClassroom,
            canManageTeachers: handledTeacherBody.canManageTeachers,
            canCreateList: handledTeacherBody.canCreateList,
            canEditList: handledTeacherBody.canEditList,
            canDeleteList: handledTeacherBody.canDeleteList,
            canManageExercises: handledTeacherBody.canManageExercises,
            canRemoveMember: handledTeacherBody.canRemoveMember,
          }));
          return;
        }
        forceRefetchMyClassroomUsers(params?.classroomId!);
        // goToPage(1);
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
        updateTeacherInClassroom(handledTeacherBody, {
          onSuccess,
          onError,
        });
        return;
      }
      addTeacherToClassroom(handledTeacherBody, { onSuccess, onError });
    },
    [
      isEdit,
      params,
      teacherId,
      goToPage,
      setClassroomTeacherFormError,
      updateTeacherInClassroom,
      toast,
      handleClose,
      clearClassroomTeacherStates,
      getHandledTeacherBody,
      addTeacherToClassroom,
    ],
  );

  const isSubmitting = useMemo(
    () => isAddingTeacherToClassroom || isUpdatingTeacherInClassroom,
    [isAddingTeacherToClassroom, isUpdatingTeacherInClassroom],
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
    showClassroomTeacherFormDialog,
    handleClose,
    submitClassroomTeacherForm: handleClassroomTeacherFormSubmit(
      handleSubmitClassroomTeacherForm,
    ),
    refetchClassroomUser,
  };
};
