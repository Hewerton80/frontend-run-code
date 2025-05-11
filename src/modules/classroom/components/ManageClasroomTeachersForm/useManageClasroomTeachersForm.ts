import { useCallback, useEffect, useMemo } from "react";
import {
  ManageTeachersFormSchema,
  useManageTeachersFormSchema,
} from "../../schemas/manageTeachersFormSchema";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { ClassroomKeys } from "../../classroomType";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import {
  UpdateClasrromTeachersBody,
  useUpdateClasrromTeachers,
} from "../../hooks/useUpdateClasrromTeachers";

export const useManageClasroomTeachersForm = () => {
  const router = useRouter();
  const params = useParams<{ classroomId?: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { loggedUser } = useAuth();

  const {
    classroom: currentClassroom,
    errorClassroom,
    isLoadingClassroom,
    refetchClassroom,
  } = useGetClassroomById(params?.classroomId);

  const {
    teachers,
    classroomTeachersFormState,
    classroomTeachersFormControl,
    resetClassroomTeachersForm,
    handleClassroomTeachersFormSubmit,
    addTeacher,
    removeTeacher,
  } = useManageTeachersFormSchema();

  useEffect(() => {
    console.log("teachers", teachers);
  }, [teachers]);

  const { updateClasrromTeachers, isUpdatingClasrromTeachers } =
    useUpdateClasrromTeachers(currentClassroom?.uuid!);

  const canManageTeachers = useMemo(() => {
    return currentClassroom?.myClassroomPermissions?.canManageTeachers;
  }, [currentClassroom]);

  const isSubmittingClassroom = useMemo(
    () => isUpdatingClasrromTeachers,
    [isUpdatingClasrromTeachers]
  );

  useEffect(() => {
    if (currentClassroom) {
      console.log("currentClassroom?.teachers", currentClassroom?.teachers);
      resetClassroomTeachersForm({
        teachers:
          currentClassroom?.teachers?.map((teacher) => ({
            value: String(teacher?.id),
            label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
            uuid: teacher?.uuid,
            canEditClassroom: teacher?.canEditClassroom,
            canManageTeachers: teacher?.canManageTeachers,
            canCreateList: teacher?.canCreateList,
            canEditList: teacher?.canEditList,
            canDeleteList: teacher?.canDeleteList,
            canManageExercises: teacher?.canManageExercises,
            canRemoveMember: teacher?.canRemoveMember,
          })) || [],
      });
    }
  }, [resetClassroomTeachersForm, currentClassroom]);

  const handleAddTeacher = useCallback(() => {
    addTeacher({
      value: "",
      canEditClassroom: false,
      canManageTeachers: false,
      canCreateList: false,
      canEditList: false,
      canDeleteList: false,
      canManageExercises: false,
      canRemoveMember: false,
    });
  }, [addTeacher]);

  const handleRemoveTeacher = useCallback(
    (index: number) => {
      removeTeacher(index);
    },
    [removeTeacher]
  );

  const getHandleClassroomTeachersFormBody = useCallback(
    (data: ManageTeachersFormSchema) => {
      const handleClassroomFormBody: UpdateClasrromTeachersBody = {
        teachers:
          data.teachers.map((teacher) => ({
            id: +teacher.value,
            canEditClassroom: teacher.canEditClassroom,
            canManageTeachers: teacher.canManageTeachers,
            canCreateList: teacher.canCreateList,
            canEditList: teacher.canEditList,
            canDeleteList: teacher.canDeleteList,
            canManageExercises: teacher.canManageExercises,
            canRemoveMember: teacher.canRemoveMember,
          })) || [],
      };
      return handleClassroomFormBody;
    },
    []
  );

  const handleCreateClassroom = useCallback(
    (data: ManageTeachersFormSchema) => {
      const onSuccess = () => {
        router.push("/home");
        toast({
          title: "Atualização de professores realizada com sucesso",
          variant: "success",
        });
        queryClient.resetQueries({
          queryKey: [ClassroomKeys.Details, currentClassroom?.uuid],
        });
      };
      const onError = () => {
        toast({
          title: "Erro ao atualizar professores",
          variant: "danger",
          direction: "bottom-right",
        });
      };
      const handleClassroomFormBody = getHandleClassroomTeachersFormBody(data);
      updateClasrromTeachers(handleClassroomFormBody, {
        onSuccess,
        onError,
      });
    },
    [
      router,
      queryClient,
      currentClassroom,
      toast,
      getHandleClassroomTeachersFormBody,
      updateClasrromTeachers,
    ]
  );

  return {
    teachers,
    classroomTeachersFormState,
    classroomTeachersFormControl,
    isSubmittingClassroom,
    currentClassroom,
    loggedUser,
    errorClassroom,
    isLoadingClassroom,
    canManageTeachers,
    refetchClassroom,
    createClassroom: handleClassroomTeachersFormSubmit(handleCreateClassroom),
    removeTeacher: handleRemoveTeacher,
    addTeacher: handleAddTeacher,
  };
};
