import { useCallback } from "react";
import { useFetchExercise } from "@/modules/exercise/hooks/useFetchExercise";
import { useTriggerExerciseDetailDialog } from "./useTriggerExerciseDetailDialog";

export const useExerciseDetailDialog = () => {
  const { showDialog, exerciseId, closeDialog } =
    useTriggerExerciseDetailDialog();

  const {
    exercise,
    isFetchingExercise: isLoading,
    exerciseError: error,
    refetchExercise: refetch,
  } = useFetchExercise({
    exerciseId: exerciseId ?? "",
  });

  const handleClose = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  return {
    showDialog,
    exercise,
    isLoading,
    error,
    refetch,
    handleClose,
  };
};
