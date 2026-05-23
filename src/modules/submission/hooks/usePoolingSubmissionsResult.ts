import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type State = {
  isPoolingSubmissionResult: boolean;
};

type Action = {
  startPoolingSubmissionResult: () => void;
  stopPoolingSubmissionResult: () => void;
};

const usePoolingSubmissionsResultStore = create<State & Action>((set) => ({
  isPoolingSubmissionResult: false,
  startPoolingSubmissionResult: () => set({ isPoolingSubmissionResult: true }),
  stopPoolingSubmissionResult: () => set({ isPoolingSubmissionResult: false }),
}));

export const usePoolingSubmissionsResult = () => {
  const isPoolingSubmissionResult = usePoolingSubmissionsResultStore(
    useShallow((state) => state.isPoolingSubmissionResult),
  );
  const startPoolingSubmissionResult = usePoolingSubmissionsResultStore(
    useShallow((state) => state.startPoolingSubmissionResult),
  );
  const stopPoolingSubmissionResult = usePoolingSubmissionsResultStore(
    useShallow((state) => state.stopPoolingSubmissionResult),
  );
  return {
    isPoolingSubmissionResult,
    startPoolingSubmissionResult,
    stopPoolingSubmissionResult,
  };
};
