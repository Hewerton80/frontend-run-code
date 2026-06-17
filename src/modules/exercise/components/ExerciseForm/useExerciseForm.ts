import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import {
  ExerciseFormSchema,
  useExerciseFormSchema,
} from "../schemas/exerciseFormSchema";
import { useToast } from "@/hooks/useToast";
import { handleExeciseBody } from "../../utils/handleExerciseBody";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const useExerciseForm = () => {
  const { exerciseFormSchemaMethods } = useExerciseFormSchema();
  const navigate = useNavigate();
  const {
    control,
    register,
    getValues: getExerciseFormData,
    formState,
    trigger: triggerExerciseFormErros,
  } = useMemo(() => exerciseFormSchemaMethods, [exerciseFormSchemaMethods]);
  const { toast } = useToast();

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
    const handledExerciseBody = handleExeciseBody(exerciseFormData);
    createExercise(handledExerciseBody, {
      onSuccess: () => {
        toast({ variant: "success", title: "Exercício criado com sucesso!" });
        navigate(ROUTES.EXERCISES);
      },
      onError: (error) => {
        console.error("Error creating exercise:", error);
        toast({
          variant: "danger",
          title: "Erro ao criar exercício",
          description:
            "Ocorreu um erro ao criar o exercício. Por favor, tente novamente.",
        });
      },
    });
  }, [
    createExercise,
    navigate,
    getExerciseFormData,
    triggerExerciseFormErros,
    toast,
  ]);

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    handleSubmitExercise,
    isSubmittingExercise,
  };
};
