import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showExerciseFormDrawer: boolean;
  exerciseUuIdToEdit: string | null;
}

interface Actions {
  setShowExerciseFormDrawer: (value: boolean | null) => void;
  setExerciseIdToEdit: (value: string | null) => void;
}

const useExerciseFormDrawerStore = create<State & Actions>((set) => ({
  showExerciseFormDrawer: false,
  exerciseUuIdToEdit: null,
  setShowExerciseFormDrawer: (value) =>
    set(() => ({ showExerciseFormDrawer: value ?? false })),
  setExerciseIdToEdit: (value) =>
    set(() => ({ exerciseUuIdToEdit: value ?? null })),
}));

export const useTriggerExerciseFormDrawer = () => {
  const { showExerciseFormDrawer, exerciseUuIdToEdit } =
    useExerciseFormDrawerStore(
      useShallow((s) => ({
        showExerciseFormDrawer: s.showExerciseFormDrawer,
        exerciseUuIdToEdit: s.exerciseUuIdToEdit,
      })),
    );

  const { setShowExerciseFormDrawer, setExerciseIdToEdit } =
    useExerciseFormDrawerStore(
      useShallow((s) => ({
        setShowExerciseFormDrawer: s.setShowExerciseFormDrawer,
        setExerciseIdToEdit: s.setExerciseIdToEdit,
      })),
    );

  const closeExerciseFormDrawer = useCallback(() => {
    setShowExerciseFormDrawer(null);
    setExerciseIdToEdit(null);
  }, [setExerciseIdToEdit, setShowExerciseFormDrawer]);

  const showExerciseFormDrawerWithExerciseId = useCallback(
    (exerciseId: string | null) => {
      setExerciseIdToEdit(exerciseId);
      setShowExerciseFormDrawer(true);
    },
    [setExerciseIdToEdit, setShowExerciseFormDrawer],
  );

  return {
    exerciseUuIdToEdit,
    showExerciseFormDrawer,
    closeExerciseFormDrawer,
    showExerciseFormDrawerWithExerciseId,
  };
};
