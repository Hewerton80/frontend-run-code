import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showDialog: boolean;
  exerciseId: string | null;
}

interface Actions {
  setShowDialog: (value: boolean) => void;
  setExerciseId: (value: string | null) => void;
}

const useExerciseDetailDialogStore = create<State & Actions>((set) => ({
  showDialog: false,
  exerciseId: null,
  setShowDialog: (value) => set(() => ({ showDialog: value })),
  setExerciseId: (value) => set(() => ({ exerciseId: value })),
}));

export const useTriggerExerciseDetailDialog = () => {
  const { showDialog, exerciseId } = useExerciseDetailDialogStore(
    useShallow((s) => ({
      showDialog: s.showDialog,
      exerciseId: s.exerciseId,
    })),
  );

  const { setShowDialog, setExerciseId } = useExerciseDetailDialogStore(
    useShallow((s) => ({
      setShowDialog: s.setShowDialog,
      setExerciseId: s.setExerciseId,
    })),
  );

  const openDialog = useCallback(
    (exerciseId: string) => {
      setExerciseId(exerciseId);
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
    exerciseId,
    openDialog,
    closeDialog,
  };
};
