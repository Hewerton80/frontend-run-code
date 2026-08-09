import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { SubmissionJobResponse } from "./useFetchSubmissionJobs";
import { useCallback } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";

type State = {
  cachedSubmissionJobs: SubmissionJobResponse[];
};

type Action = {
  setCachedSubmissionJobs: (submissionJobs: SubmissionJobResponse[]) => void;
  addCachedSubmissionJob: (
    exerciseId: string,
    submissionJob: SubmissionJobResponse,
  ) => void;
};

const useCachedSubmissionJobsStore = create<State & Action>((set) => ({
  cachedSubmissionJobs: [],
  setCachedSubmissionJobs: (submissionJobs) =>
    set(() => ({ cachedSubmissionJobs: submissionJobs })),
  addCachedSubmissionJob: (exerciseId, submissionJob) =>
    set((state) => {
      const foundIndex = state.cachedSubmissionJobs.findIndex(
        (job) => job.exerciseUuId === exerciseId,
      );
      if (foundIndex !== -1) {
        const newCachedSubmissionJobs = [...state.cachedSubmissionJobs];
        newCachedSubmissionJobs[foundIndex] = submissionJob;
        return { cachedSubmissionJobs: newCachedSubmissionJobs };
      } else {
        return {
          cachedSubmissionJobs: [
            ...state.cachedSubmissionJobs,
            { ...submissionJob, exerciseId },
          ],
        };
      }
    }),
}));

export const useCachedSubmissionJobs = () => {
  const cachedSubmissionJobs = useCachedSubmissionJobsStore(
    useShallow((state) => state.cachedSubmissionJobs),
  );

  const setCachedSubmissionJobs = useCachedSubmissionJobsStore(
    useShallow((state) => state.setCachedSubmissionJobs),
  );

  const addCachedSubmissionJob = useCachedSubmissionJobsStore(
    useShallow((state) => state.addCachedSubmissionJob),
  );

  const { setLoggedUser } = useLoggedUser();

  const handleAddCachedSubmissionJob = useCallback(
    (exerciseId: string, submissionJob: SubmissionJobResponse) => {
      addCachedSubmissionJob(exerciseId, submissionJob);
      setLoggedUser((prevLoggedUser) => {
        if (!prevLoggedUser) return prevLoggedUser;
        return {
          ...prevLoggedUser,
          activeJobIds: [
            ...(prevLoggedUser?.activeJobIds || []),
            submissionJob.jobId,
          ],
        };
      });
    },
    [addCachedSubmissionJob, setLoggedUser],
  );

  return {
    cachedSubmissionJobs,
    setCachedSubmissionJobs,
    addCachedSubmissionJob: handleAddCachedSubmissionJob,
  };
};
