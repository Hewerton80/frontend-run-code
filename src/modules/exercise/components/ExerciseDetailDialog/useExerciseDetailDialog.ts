import { useCallback } from "react";
import { useFetchExerciseByUuId } from "@/modules/exercise/hooks/useFetchExerciseByUuId";
import { useTriggerExerciseDetailDialog } from "./useTriggerExerciseDetailDialog";

export const useExerciseDetailDialog = () => {
  const { showDialog, exerciseUuId, closeDialog } =
    useTriggerExerciseDetailDialog();

  const {
    exercise,
    isFetchingExercise: isLoading,
    exerciseError: error,
    refetchExercise: refetch,
  } = useFetchExerciseByUuId({
    exerciseUuId: exerciseUuId ?? "",
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
