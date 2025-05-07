import { useCallback, useEffect, useMemo } from "react";
import {
  ClassroomFormSchema,
  useClassroomFormSchema,
} from "../../schemas/classroomFormSchema";
import { languagesConfig } from "@/modules/language/utils/languagesConfig";
import {
  CreateClassroomBody,
  useCreateClassroom,
} from "../../hooks/useCreateClassroom";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";

export const useClassroomForm = () => {
  const router = useRouter();
  const params = useParams<{ classroomId?: string }>();

  const {
    classroom: currentClassroom,
    errorClassroom,
    isLoadingClassroom,
    refetchClassroom,
  } = useGetClassroomById(params?.classroomId);

  const { toast } = useToast();
  const {
    teachers,
    classroomFormState,
    classroomFormControl,
    resetClassroomForm,
    addTeacher,
    registerClassroomForm,
    watchClassroomForm,
    setClassroomFormValue,
    removeTeacher,
    handleClassroomFormSubmit,
  } = useClassroomFormSchema();

  const { createClassroom, isCreatingClassroom } = useCreateClassroom();

  const { isAddTeachers } = watchClassroomForm();

  const isSubmittingClassroom = useMemo(
    () => isCreatingClassroom,
    [isCreatingClassroom]
  );

  const languagesOptions = useMemo(() => {
    return Object.keys(languagesConfig).map((key) => ({
      label: key,
      value: key,
    }));
  }, []);

  useEffect(() => {
    if (currentClassroom) {
      // console.log("currentClassroom.teachers", currentClassroom?.teachers);
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
            numberId: teacher?.id,
            label: `${teacher?.email} - ${teacher?.name} ${teacher?.surname}`,
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

  useEffect(() => {
    if (isAddTeachers) {
      setClassroomFormValue("teachers", [
        {
          numberId: "",
          canEditClassroom: false,
          canManageTeachers: false,
          canCreateList: false,
          canEditList: false,
          canDeleteList: false,
          canManageExercises: false,
          canRemoveMember: false,
        },
      ]);
    } else {
      setClassroomFormValue("teachers", []);
    }
  }, [isAddTeachers, setClassroomFormValue]);

  const handleAddTeacher = useCallback(() => {
    addTeacher({
      numberId: "",
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
    (data: ClassroomFormSchema) => {
      const handleClassroomFormBody: CreateClassroomBody = {
        name: data.name,
        languages: data.languages.map((language) => language.value),
        status: data.isVisible ? 1 : 2,
        teachers: data?.isAddTeachers
          ? data.teachers.map((teacher) => ({
              id: +teacher.numberId,
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
    (data: ClassroomFormSchema) => {
      const onSuccess = () => {
        router.push("/home");
        toast({
          title: "Turma criada com sucesso!",
          variant: "success",
        });
      };
      const onError = () => {
        toast({
          title: "Erro ao criar turma",
          variant: "danger",
          direction: "bottom-right",
        });
      };
      const handleClassroomFormBody = getHandleClassroomFormBody(data);
      createClassroom(handleClassroomFormBody, { onSuccess, onError });
    },
    [router, toast, getHandleClassroomFormBody, createClassroom]
  );

  return {
    teachers,
    classroomFormState,
    classroomFormControl,
    isAddTeachers,
    languagesOptions,
    isSubmittingClassroom,
    currentClassroom,
    createClassroom: handleClassroomFormSubmit(handleCreateClassroom),
    removeTeacher: handleRemoveTeacher,
    addTeacher: handleAddTeacher,
    registerClassroomForm,
  };
};
