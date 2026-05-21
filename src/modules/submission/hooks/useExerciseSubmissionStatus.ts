import { create } from "zustand";
import { SubmissionStatus } from "../submissionType";
import { useShallow } from "zustand/react/shallow";

type ExerciseSubmissionStatus = {
  status: SubmissionStatus;
  exerciseId: string;
  submissionId: string;
};

// updater like useState
type Updater<T> = (prev: T) => T;

type State = {
  exerciseSubmissionStatus: Map<string, ExerciseSubmissionStatus>;
};

type Action = {
  setExerciseSubmissionStatus: (
    exerciseId: string,
    submissionStatus:
      | ExerciseSubmissionStatus
      | Updater<ExerciseSubmissionStatus>,
  ) => void;
};

const useExerciseSubmissionStatusStore = create<State & Action>((set) => ({
  exerciseSubmissionStatus: new Map(),
  setExerciseSubmissionStatus: (exerciseId, submissionStatus) =>
    set((state) => {
      const newStatus =
        typeof submissionStatus === "function"
          ? submissionStatus(state.exerciseSubmissionStatus.get(exerciseId)!)
          : submissionStatus;
      const newMap = new Map(state.exerciseSubmissionStatus);
      newMap.set(exerciseId, newStatus);
      return { exerciseSubmissionStatus: newMap };
    }),
}));

export const useExerciseSubmissionStatus = () => {
  const exerciseSubmissionStatus = useExerciseSubmissionStatusStore(
    useShallow((state) => state.exerciseSubmissionStatus),
  );
  const setExerciseSubmissionStatus = useExerciseSubmissionStatusStore(
    (state) => state.setExerciseSubmissionStatus,
  );

  return {
    exerciseSubmissionStatus,
    setExerciseSubmissionStatus,
  };
};
