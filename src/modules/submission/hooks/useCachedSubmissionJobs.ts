import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { useCallback, useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { SubmissionJobDto } from "../types/SubmissionJobDto";

type State = {
  cachedSubmissionJobs: SubmissionJobDto[];
};

type Action = {
  setCachedSubmissionJobs: (submissionJobs: SubmissionJobDto[]) => void;
  addCachedSubmissionJob: (
    exerciseId: string,
    submissionJob: SubmissionJobDto,
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
  const { setLoggedUser, loggedUser } = useLoggedUser();

  const handleAddCachedSubmissionJob = useCallback(
    (exerciseId: string, submissionJob: SubmissionJobDto) => {
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
    [setLoggedUser],
  );

  const submissionJobs = useMemo(
    () => loggedUser?.submissionJobs || [],
    [loggedUser],
  );

  const hasActiveJobs = useMemo(
    () => submissionJobs.some((job) => job.isProcessing),
    [submissionJobs],
  );

  const setSubmimissionJobs = useCallback(
    (submissionJobs: SubmissionJobDto[]) => {
      setLoggedUser((prevLoggedUser) => {
        if (!prevLoggedUser) return prevLoggedUser;
        return { ...prevLoggedUser, submissionJobs };
      });
    },
    [setLoggedUser],
  );

  const addSubmissionJob = useCallback(
    (exerciseUuid: string, submissionJob: SubmissionJobDto) => {
      setLoggedUser((prevLoggedUser) => {
        if (!prevLoggedUser) return prevLoggedUser;
        const prevSubmissionJobs = prevLoggedUser.submissionJobs || [];
        const foundIndex =
          prevSubmissionJobs?.findIndex(
            (job) => job.exerciseUuId === exerciseUuid,
          ) ?? -1;
        if (foundIndex !== -1) {
          const newCachedSubmissionJobs = [...prevSubmissionJobs];
          newCachedSubmissionJobs[foundIndex] = submissionJob;
          return { ...prevLoggedUser, submissionJobs: newCachedSubmissionJobs };
        } else {
          return {
            ...prevLoggedUser,
            submissionJobs: [
              ...prevSubmissionJobs,
              { ...submissionJob, exerciseUuid },
            ],
          };
        }
      });
    },
    [setLoggedUser],
  );

  const removeSubmissionJob = useCallback(
    (jobId: string) => {
      setLoggedUser((prevLoggedUser) => {
        if (!prevLoggedUser) return prevLoggedUser;
        const prevSubmissionJobs = prevLoggedUser.submissionJobs || [];
        const newSubmissionJobs = prevSubmissionJobs.filter(
          (job) => job.jobId !== jobId,
        );
        return { ...prevLoggedUser, submissionJobs: newSubmissionJobs };
      });
    },
    [setLoggedUser],
  );

  return {
    submissionJobs,
    hasActiveJobs,
    setSubmimissionJobs,
    addSubmissionJob,
    removeSubmissionJob,
  };
};
