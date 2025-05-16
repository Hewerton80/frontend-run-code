import { CONSTANTS } from "@/utils/constants";
import { isNumber } from "@/utils/isType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const {
  VALIDATION: { REQUIRED_FIELD },
} = CONSTANTS;

export const teacherFormSchema = z.object({
  value: z.string().min(1, REQUIRED_FIELD),
  label: z.string().optional(),
  uuid: z.string().optional(),
  canEditClassroom: z.boolean(),
  canManageTeachers: z.boolean(),
  canCreateList: z.boolean(),
  canEditList: z.boolean(),
  canDeleteList: z.boolean(),
  canManageExercises: z.boolean(),
  canRemoveMember: z.boolean(),
});

export type TeacherFormSchema = z.infer<typeof teacherFormSchema>;

export const useTeacherFormSchema = () => {
  const defaultValues = useMemo<TeacherFormSchema>(
    () => ({
      value: "",
      label: "",
      uuid: "",
      canEditClassroom: false,
      canManageTeachers: false,
      canCreateList: false,
      canEditList: false,
      canDeleteList: false,
      canManageExercises: false,
      canRemoveMember: false,
    }),
    []
  );

  const {
    formState: classroomTeacherFormState,
    control: classroomTeacherFormControl,
    handleSubmit: handleClassroomTeacherFormSubmit,
    reset: resetClassroomTeacherForm,
    clearErrors: clearClassroomTeacherFormErrors,
    setError: setClassroomTeacherFormError,
    trigger: triggerClassroomTeacherForm,
  } = useForm<TeacherFormSchema>({
    defaultValues,
    resolver: zodResolver(teacherFormSchema),
    mode: "onTouched",
  });

  const clearClassroomTeacherStates = useCallback(() => {
    resetClassroomTeacherForm(defaultValues);
    clearClassroomTeacherFormErrors();
  }, [
    defaultValues,
    resetClassroomTeacherForm,
    clearClassroomTeacherFormErrors,
  ]);

  return {
    classroomTeacherFormState,
    classroomTeacherFormControl,
    handleClassroomTeacherFormSubmit,
    clearClassroomTeacherStates,
    resetClassroomTeacherForm,
    clearClassroomTeacherFormErrors,
    setClassroomTeacherFormError,
    triggerClassroomTeacherForm,
  };
};
