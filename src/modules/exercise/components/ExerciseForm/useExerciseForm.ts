import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import {
  ExerciseFormSchema,
  useExerciseFormSchema,
} from "../schemas/exerciseFormSchema";

export const useExerciseForm = () => {
  const { exerciseFormSchemaMethods } = useExerciseFormSchema();

  const {
    control,
    register,
    getValues: getExerciseFormData,
    formState,
    trigger: triggerExerciseFormErros,
  } = useMemo(() => exerciseFormSchemaMethods, [exerciseFormSchemaMethods]);

  const { createExercise, isCreatingExercise } = useCreateExercise();

  const isSubmittingExercise = useMemo(
    () =>
      isCreatingExercise || formState.isValidating || formState.isSubmitting,
    [isCreatingExercise, formState.isValidating, formState.isSubmitting],
  );

  useEffect(() => {
    console.log({
      errors: formState.errors,
      testCases: formState.errors.testCases?.["root"]?.message,
    });
  }, [formState.errors]);

  const handleSubmitExercise = useCallback(async () => {
    const isValid = await triggerExerciseFormErros();
    console.log("isValid", isValid);
    if (!isValid) return;
    const exerciseFormData = getExerciseFormData();
    console.log("Submitting exercise:", exerciseFormData);
  }, []);

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    handleSubmitExercise,
    isSubmittingExercise,
  };
};
