import { CONSTANTS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const {
  VALIDATION: { REQUIRED_FIELD },
} = CONSTANTS;

export const classroomFormSchema = z.object({
  name: z.string().min(1, REQUIRED_FIELD),
  isVisible: z.boolean(),
  isAddTeachers: z.boolean(),
  languages: z.array(
    z.object({
      label: z.string().min(1, REQUIRED_FIELD),
      value: z.string().min(1, REQUIRED_FIELD),
    })
  ),
  teachers: z.array(
    z.object({
      id: z.string().min(1, REQUIRED_FIELD),
      canEditClassroom: z.boolean(),
      canManageTeachers: z.boolean(),
      canCreateList: z.boolean(),
      canEditList: z.boolean(),
      canDeleteList: z.boolean(),
      canManageExercises: z.boolean(),
      canRemoveMember: z.boolean(),
    })
  ),
});

export type ClassroomFormSchema = z.infer<typeof classroomFormSchema>;

export const useClassroomFormSchema = () => {
  const defaultValues = useMemo<ClassroomFormSchema>(
    () => ({
      name: "",
      isVisible: false,
      languages: [],
      isAddTeachers: false,
      teachers: [],
    }),
    []
  );

  const {
    formState: classroomFormState,
    control: classroomFormControl,
    register: registerClassroomForm,
    watch: watchClassroomForm,
    setValue: setClassroomFormValue,
    handleSubmit: handleClassroomFormSubmit,
    // clearErrors: clearClassroomFormErrors,
  } = useForm<ClassroomFormSchema>({
    defaultValues,
    resolver: zodResolver(classroomFormSchema),
    mode: "onTouched",
  });

  const {
    fields: teachers,
    append: addTeacher,
    remove: removeTeacher,
  } = useFieldArray({
    name: "teachers",
    control: classroomFormControl,
  });

  return {
    teachers,
    classroomFormState,
    classroomFormControl,
    handleClassroomFormSubmit,
    watchClassroomForm,
    setClassroomFormValue,
    addTeacher,
    removeTeacher,
    registerClassroomForm,
  };
};
