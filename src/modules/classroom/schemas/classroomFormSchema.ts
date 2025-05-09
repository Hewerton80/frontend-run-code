import { CONSTANTS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
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
    handleSubmit: handleClassroomFormSubmit,
    reset: resetClassroomForm,
    clearErrors: clearClassroomFormErrors,
  } = useForm<ClassroomFormSchema>({
    defaultValues,
    resolver: zodResolver(classroomFormSchema),
    mode: "onTouched",
  });

  const clearClassroomFormStates = useCallback(() => {
    resetClassroomForm(defaultValues);
    clearClassroomFormErrors();
  }, [resetClassroomForm, clearClassroomFormErrors, defaultValues]);

  return {
    classroomFormState,
    classroomFormControl,
    resetClassroomForm,
    handleClassroomFormSubmit,
    watchClassroomForm,
    registerClassroomForm,
    clearClassroomFormStates,
  };
};
