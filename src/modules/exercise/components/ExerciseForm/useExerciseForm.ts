import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import { useExerciseFormSchema } from "../schemas/exerciseFormSchema";
import { useToast } from "@/hooks/useToast";
import { handleExeciseBody } from "../../utils/handleExerciseBody";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { ExerciseStatus } from "../../exerciseTypes";
import { useFetchExercise } from "../../hooks/useFetchExercise";
import { useUpdateExercise } from "../../hooks/useUpdateExercise";
import { forceRefetchExercises } from "../../utils/forceRefetchExercises";

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

  const isEditMode = useMemo(() => !!params?.exerciseId, [params?.exerciseId]);

  const { exercise: currentExercise, isFetchingExercise } = useFetchExercise({
    exerciseId: params?.exerciseId || "",
  });

  // TODO adicionar um from, para saber de onde o usuário está vindo, para retornar de onde ele veio
  const { toast } = useToast();

  const { createExercise, isCreatingExercise } = useCreateExercise();

  const { updateExercise, isUpdatingExercise } = useUpdateExercise(
    params?.exerciseId || "",
  );

  const isSubmittingExercise = useMemo(
    () =>
      isCreatingExercise ||
      isUpdatingExercise ||
      formState.isValidating ||
      formState.isSubmitting,
    [
      isCreatingExercise,
      isUpdatingExercise,
      formState.isValidating,
      formState.isSubmitting,
    ],
  );

  const handleSetCurrentExerciseToForm = useCallback(() => {
    if (!currentExercise) return;
    resetExerciseForm({
      title: currentExercise.title,
      description: currentExercise.description,
      testCases: (currentExercise?.testCases || []).map((testCase) => ({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        isPublic: testCase.isPublic,
      })),
    });
  }, [currentExercise, resetExerciseForm]);

  useEffect(() => {
    handleSetCurrentExerciseToForm();
  }, [handleSetCurrentExerciseToForm]);

  useEffect(() => {
    console.log({
      errors: formState.errors,
      testCases: formState.errors.testCases?.["root"]?.message,
    });
  }, [formState.errors]);

  console.log(
    "formState.isDirty",
    formState.isDirty,
    "formState.dirtyFields",
    formState.dirtyFields,
  );

  const handleResetExercisesForm = useCallback(() => {
    if (currentExercise) {
      handleSetCurrentExerciseToForm();
      return;
    }
    resetExerciseForm(exerciseFormSchemaDefaultValues);
  }, [
    resetExerciseForm,
    currentExercise,
    exerciseFormSchemaDefaultValues,
    handleSetCurrentExerciseToForm,
  ]);

  const handleSubmitExercise = useCallback(
    async (status: ExerciseStatus) => {
      const isValid = await triggerExerciseFormErros();
      console.log("isValid", isValid);
      if (!isValid) return;
      const exerciseFormData = getExerciseFormData();
      console.log("Submitting exercise:", exerciseFormData);
      // quando for editar adicionar apenas os campos que foram editados, usar getOnlyDirtyFields
      const handledExerciseBody = handleExeciseBody(exerciseFormData, status);
      if (isEditMode) {
        updateExercise(handledExerciseBody, {
          onSuccess: () => {
            toast({
              variant: "success",
              title: "Exercício atualizado com sucesso!",
            });
            // TODO adicionar reset aqui com os valores atualizados
            // TODO atualizar no cache exercise row e datail para não precisar refetchar a lista inteira
          },
          onError: (error) => {
            console.error("Error updating exercise:", error);
            const errorMessage =
              (error as any)?.response?.data?.message ||
              "Erro ao atualizar exercício";
            toast({
              variant: "danger",
              title: "Erro ao atualizar exercício",
              description: errorMessage,
            });
          },
        });
        return;
      }
      createExercise(handledExerciseBody, {
        onSuccess: (data) => {
          toast({
            variant: "success",
            title: "Exercício criado com sucesso!",
          });
          forceRefetchExercises();
          //TODO trazer o id do exercício criado para redirecionar para a página de editar
          navigate(ROUTES.EXERCISES_EDIT(data.id));
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.message ||
            "Erro ao criar exercício";
          console.error("Error creating exercise:", error);
          toast({
            variant: "danger",
            title: "Erro ao criar exercício",
            description: errorMessage,
          });
        },
      });
    },
    [
      isEditMode,
      updateExercise,
      createExercise,
      navigate,
      getExerciseFormData,
      triggerExerciseFormErros,
      toast,
    ],
  );

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    isFetchingExercise,
    isEditMode,
    handleSubmitExercise,
    isSubmittingExercise,
    handleResetExercisesForm,
  };
};
