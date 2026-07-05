import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import { useExerciseFormSchema } from "../schemas/exerciseFormSchema";
import { toast } from "@/hooks/useToast";
import { handleCreateExeciseBody } from "../../utils/handleExerciseBody";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { ExerciseStatus } from "../../exerciseTypes";
import { forceRefetchExercises } from "../../utils/forceRefetchExercises";

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

  // TODO adicionar um from, para saber de onde o usuário está vindo, para retornar de onde ele veio
  // TODO adicionar opção de salvar como rascunho
  const { createExercise, isCreatingExercise } = useCreateExercise();

  const isSubmittingExercise = useMemo(
    () =>
      isCreatingExercise || formState.isValidating || formState.isSubmitting,
    [isCreatingExercise, formState.isValidating, formState.isSubmitting],
  );

  // const handleResetExercisesForm = useCallback(() => {
  //   if (currentExercise) {
  //     handleSetCurrentExerciseToForm();
  //     return;
  //   }
  //   resetExerciseForm(exerciseFormSchemaDefaultValues);
  // }, [
  //   resetExerciseForm,
  //   currentExercise,
  //   exerciseFormSchemaDefaultValues,
  //   handleSetCurrentExerciseToForm,
  // ]);

  useEffect(() => {
    console.log({
      errors: formState.errors,
      testCases: formState.errors.testCases?.["root"]?.message,
    });
  }, [formState.errors]);

  // console.log(
  //   "formState.isDirty",
  //   formState.isDirty,
  //   "formState.dirtyFields",
  //   formState.dirtyFields,
  // );

  const handleSubmitExercise = useCallback(
    async (status: ExerciseStatus) => {
      const isValid = await triggerExerciseFormErros();
      if (!isValid) return;

      const exerciseFormData = getExerciseFormData();

      const handledExerciseBody = handleCreateExeciseBody(
        exerciseFormData,
        status,
      );
      createExercise(handledExerciseBody, {
        onSuccess: () => {
          toast.success("Exercício criado com sucesso!");
          forceRefetchExercises();
          navigate(ROUTES.EXERCISES);
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.message ||
            "Erro ao criar exercício";
          console.error("Error creating exercise:", error);
          toast.error(errorMessage);
        },
      });
    },
    [createExercise, navigate, getExerciseFormData, triggerExerciseFormErros],
  );

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    handleSubmitExercise,
    isSubmittingExercise,
  };
};
