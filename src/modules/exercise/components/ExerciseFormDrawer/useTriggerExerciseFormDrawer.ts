import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";

interface State {
  showExerciseFormDrawer: boolean;
  exerciseIdToEdit: string | null;
}

interface Actions {
  setShowExerciseFormDrawer: (value: boolean | null) => void;
  setExerciseIdToEdit: (value: string | null) => void;
}

const useExerciseFormDrawerStore = create<State & Actions>((set) => ({
  showExerciseFormDrawer: false,
  exerciseIdToEdit: null,
  setShowExerciseFormDrawer: (value) =>
    set(() => ({ showExerciseFormDrawer: value ?? false })),
  setExerciseIdToEdit: (value) =>
    set(() => ({ exerciseIdToEdit: value ?? null })),
}));

export const useTriggerExerciseFormDrawer = () => {
  const { showExerciseFormDrawer, exerciseIdToEdit } =
    useExerciseFormDrawerStore(
      useShallow((s) => ({
        showExerciseFormDrawer: s.showExerciseFormDrawer,
        exerciseIdToEdit: s.exerciseIdToEdit,
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
    exerciseIdToEdit,
    showExerciseFormDrawer,
    closeExerciseFormDrawer,
    showExerciseFormDrawerWithExerciseId,
  };
};
