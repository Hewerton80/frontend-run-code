import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showDialog: boolean;
  exerciseUuId: string | null;
}

interface Actions {
  setShowDialog: (value: boolean) => void;
  setExerciseId: (value: string | null) => void;
}

const useExerciseDetailDialogStore = create<State & Actions>((set) => ({
  showDialog: false,
  exerciseUuId: null,
  setShowDialog: (value) => set(() => ({ showDialog: value })),
  setExerciseId: (value) => set(() => ({ exerciseUuId: value })),
}));

export const useTriggerExerciseDetailDialog = () => {
  const { showDialog, exerciseUuId } = useExerciseDetailDialogStore(
    useShallow((s) => ({
      showDialog: s.showDialog,
      exerciseUuId: s.exerciseUuId,
    })),
  );

  const { setShowDialog, setExerciseId } = useExerciseDetailDialogStore(
    useShallow((s) => ({
      setShowDialog: s.setShowDialog,
      setExerciseId: s.setExerciseId,
    })),
  );

  const openDialog = useCallback(
    (exerciseUuId: string) => {
      setExerciseId(exerciseUuId);
      setShowDialog(true);
    },
    [setExerciseId, setShowDialog],
  );

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    setExerciseId(null);
  }, [setShowDialog, setExerciseId]);

  return {
    showDialog,
    exerciseUuId,
    openDialog,
    closeDialog,
  };
};
