import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import { useExerciseFormSchema } from "../schemas/exerciseFormSchema";
import { useToast } from "@/hooks/useToast";
import { handleExeciseBody } from "../../utils/handleExerciseBody";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { ExerciseStatus } from "../../exerciseTypes";

export const useExerciseForm = () => {
  const { exerciseFormSchemaMethods, exerciseFormSchemaDefaultValues } =
    useExerciseFormSchema();
  const navigate = useNavigate();
  const {
    control,
    register,
    reset: resetExerciseForm,
    getValues: getExerciseFormData,
    formState,
    trigger: triggerExerciseFormErros,
  } = useMemo(() => exerciseFormSchemaMethods, [exerciseFormSchemaMethods]);
  const params = useParams<{ exerciseId?: string }>();
  // TODO adicionar um from, para saber de onde o usuário está vindo, para retornar de onde ele veio
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

  const handleResetExercisesForm = useCallback(() => {
    resetExerciseForm(exerciseFormSchemaDefaultValues);
  }, [resetExerciseForm, exerciseFormSchemaDefaultValues]);

  const handleSubmitExercise = useCallback(
    async (status: ExerciseStatus) => {
      const isValid = await triggerExerciseFormErros();
      console.log("isValid", isValid);
      if (!isValid) return;
      const exerciseFormData = getExerciseFormData();
      console.log("Submitting exercise:", exerciseFormData);
      const handledExerciseBody = handleExeciseBody(exerciseFormData, status);
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
    },
    [
      createExercise,
      navigate,
      getExerciseFormData,
      triggerExerciseFormErros,
      toast,
    ],
  );

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    handleSubmitExercise,
    isSubmittingExercise,
    handleResetExercisesForm,
  };
};
