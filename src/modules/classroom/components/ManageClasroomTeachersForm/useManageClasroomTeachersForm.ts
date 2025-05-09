import { useCallback, useEffect, useMemo } from "react";
import {
  ManageTeachersFormSchema,
  useManageTeachersFormSchema,
} from "../../schemas/manageTeachersFormSchema";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import {
  CreateClassroomBody,
  useCreateClassroom,
} from "../../hooks/useCreateClassroom";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useUpdateClassroom } from "../../hooks/useUpdateClassroom";
import { ClassroomKeys } from "../../classroomType";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/useAuth";

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

  const isEditClassroom = useMemo(() => {
    return Boolean(params?.classroomId);
  }, [params]);

  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    resetClassroomForm,
    addTeacher,
    registerClassroomForm,
    watchClassroomForm,
    removeTeacher,
    handleClassroomFormSubmit,
  } = useManageTeachersFormSchema();

  const { updateClassroom, isUpdatingClassroom } = useUpdateClassroom(
    currentClassroom?.uuid!
  );

  const { createClassroom, isCreatingClassroom } = useCreateClassroom();

  const { isAddTeachers } = watchClassroomForm();

  const canEditClassroom = useMemo(() => {
    if (!isEditClassroom) return true;
    return currentClassroom?.myClassroomPermissions?.canEditClassroom;
  }, [currentClassroom, isEditClassroom]);

  const isSubmittingClassroom = useMemo(
    () => isCreatingClassroom || isUpdatingClassroom,
    [isCreatingClassroom, isUpdatingClassroom]
  );

  const languagesOptions = useMemo(() => {
    return Object.keys(languagesConfig).map((key) => ({
      label: key,
      value: key,
    }));
  }, []);

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
  }, [resetClassroomForm, currentClassroom]);

  // useEffect(() => {
  //   if (isAddTeachers) {
  //     setClassroomFormValue("teachers", [
  //       {
  //         value: "",
  //         canEditClassroom: false,
  //         canManageTeachers: false,
  //         canCreateList: false,
  //         canEditList: false,
  //         canDeleteList: false,
  //         canManageExercises: false,
  //         canRemoveMember: false,
  //       },
  //     ]);
  //   } else {
  //     setClassroomFormValue("teachers", []);
  //   }
  // }, [isAddTeachers, setClassroomFormValue]);

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

  const getHandleClassroomFormBody = useCallback(
    (data: ManageTeachersFormSchema) => {
      const handleClassroomFormBody: CreateClassroomBody = {
        name: data.name,
        languages: data.languages.map((language) => language.value),
        status: data.isVisible ? 1 : 2,
        teachers: data?.isAddTeachers
          ? data.teachers.map((teacher) => ({
              id: +teacher.value,
              canEditClassroom: teacher.canEditClassroom,
              canManageTeachers: teacher.canManageTeachers,
              canCreateList: teacher.canCreateList,
              canEditList: teacher.canEditList,
              canDeleteList: teacher.canDeleteList,
              canManageExercises: teacher.canManageExercises,
              canRemoveMember: teacher.canRemoveMember,
            }))
          : [],
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
          title: `Turma ${
            currentClassroom ? "editada" : "criada"
          } com sucesso!`,
          variant: "success",
        });
        if (currentClassroom) {
          queryClient.resetQueries({
            queryKey: [ClassroomKeys.Details, currentClassroom?.uuid],
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
    teachers,
    classroomFormState,
    classroomFormControl,
    isAddTeachers,
    languagesOptions,
    isSubmittingClassroom,
    currentClassroom,
    loggedUser,
    errorClassroom,
    isLoadingClassroom,
    isEditClassroom,
    canEditClassroom,
    refetchClassroom,
    createClassroom: handleClassroomFormSubmit(handleCreateClassroom),
    removeTeacher: handleRemoveTeacher,
    addTeacher: handleAddTeacher,
    registerClassroomForm,
  };
};
