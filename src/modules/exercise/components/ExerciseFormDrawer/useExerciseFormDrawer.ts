import { useCallback, useEffect, useMemo } from "react";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import { useExerciseFormSchema } from "../schemas/exerciseFormSchema";
import { toast } from "@/hooks/useToast";
import {
  handleCreateExeciseBody,
  handleUpdateExerciseBody,
} from "../../utils/handleExerciseBody";
import { ExerciseStatus } from "../../exerciseTypes";
import { useFetchExerciseByUuId } from "../../hooks/useFetchExerciseByUuId";
import { useUpdateExercise } from "../../hooks/useUpdateExercise";
import { forceRefetchExercises } from "../../utils/forceRefetchExercises";
import { getOnlyDirtyFields } from "@/utils/hookFormHelpers";
import { updateCachedExerciseRow } from "../../utils/updateCachedExerciseRow";
import { updateCachedStandaloneExercise } from "../../utils/updateCachedStandaloneExercise";
import { useTriggerExerciseFormDrawer } from "./useTriggerExerciseFormDrawer";

export const useExerciseFormDrawer = () => {
  const { exerciseFormSchemaMethods, exerciseFormSchemaDefaultValues } =
    useExerciseFormSchema();

  const {
    control,
    register,
    reset: resetExerciseForm,
    getValues: getExerciseFormData,
    formState,
    trigger: triggerExerciseFormErros,
  } = useMemo(() => exerciseFormSchemaMethods, [exerciseFormSchemaMethods]);

  const {
    exerciseUuIdToEdit,
    closeExerciseFormDrawer,
    showExerciseFormDrawer,
  } = useTriggerExerciseFormDrawer();

  const isEditMode = useMemo(() => !!exerciseUuIdToEdit, [exerciseUuIdToEdit]);

  const { exercise: currentExercise, isFetchingExercise } =
    useFetchExerciseByUuId({
      exerciseUuId: exerciseUuIdToEdit || "",
    });

  const { createExercise, isCreatingExercise } = useCreateExercise();

  const { updateExercise, isUpdatingExercise } = useUpdateExercise(
    exerciseUuIdToEdit || "",
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

  const handleResetExercisesForm = useCallback(() => {
    if (currentExercise) {
      resetExerciseForm({
        title: currentExercise.title,
        description: currentExercise.description,
        testCases: (currentExercise?.testCases || []).map((testCase) => ({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          isPublic: testCase.isPublic,
        })),
      });
      return;
    }
    resetExerciseForm(exerciseFormSchemaDefaultValues);
  }, [currentExercise, resetExerciseForm, exerciseFormSchemaDefaultValues]);

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
    if (!currentExercise) return;
    handleResetExercisesForm();
  }, [handleResetExercisesForm, currentExercise]);

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

  const handleCloseExerciseFormDrawer = useCallback(() => {
    closeExerciseFormDrawer();
    handleResetExercisesForm();
  }, [closeExerciseFormDrawer, handleResetExercisesForm]);

  const handleSubmitExercise = useCallback(
    async (status: ExerciseStatus) => {
      const isValid = await triggerExerciseFormErros();
      if (!isValid) return;

      const exerciseFormData = getExerciseFormData();

      if (isEditMode) {
        const dirtyFields = getOnlyDirtyFields(
          exerciseFormData,
          formState.dirtyFields,
        );
        const handledUpdateExerciseBody = handleUpdateExerciseBody(
          dirtyFields,
          status,
        );
        updateExercise(handledUpdateExerciseBody, {
          onSuccess: () => {
            toast.success("Exercício atualizado com sucesso!");
            handleCloseExerciseFormDrawer();
            const updatedExercise = {
              title: exerciseFormData.title,
              description: exerciseFormData.description,
              status: status,
            };
            const testCases = exerciseFormData.testCases;
            updateCachedExerciseRow(
              exerciseUuIdToEdit || "",
              (oldExercise) => ({
                ...(oldExercise || {}),
                ...updatedExercise,
              }),
            );
            updateCachedStandaloneExercise(
              { exerciseUuId: exerciseUuIdToEdit || "" },
              (oldExercise) => ({
                ...(oldExercise || {}),
                ...updatedExercise,
                testCases:
                  testCases?.map((testCase, index) => ({
                    id: oldExercise?.testCases?.[index]?.id || 0,
                    exerciseUuId: oldExercise?.uuid || "",
                    input: testCase.input,
                    expectedOutput: testCase.expectedOutput,
                    isPublic: testCase.isPublic,
                  })) || [],
              }),
            );
          },
          onError: (error) => {
            console.error("Error updating exercise:", error);
            const errorMessage =
              (error as any)?.response?.data?.message ||
              "Erro ao atualizar exercício";
            toast.error(errorMessage);
          },
        });
        return;
      }
      const handledExerciseBody = handleCreateExeciseBody(
        exerciseFormData,
        status,
      );
      createExercise(handledExerciseBody, {
        onSuccess: () => {
          toast.success("Exercício criado com sucesso!");
          handleCloseExerciseFormDrawer();
          forceRefetchExercises();
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
    [
      isEditMode,
      formState.dirtyFields,
      exerciseUuIdToEdit,
      handleCloseExerciseFormDrawer,
      updateExercise,
      createExercise,
      getExerciseFormData,
      triggerExerciseFormErros,
    ],
  );

  return {
    exerciseFormSchemaMethods: { control, register, formState },
    currentExercise,
    showExerciseFormDrawer,
    handleCloseExerciseFormDrawer,
    handleSubmitExercise,
    isSubmittingExercise,
    isFetchingExercise,
  };
};
