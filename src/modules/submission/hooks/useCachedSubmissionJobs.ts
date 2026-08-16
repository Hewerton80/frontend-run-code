import { useCallback, useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { SubmissionJobDto } from "../types/SubmissionJobDto";

export const useCachedSubmissionJobs = () => {
  const { setLoggedUser, loggedUser } = useLoggedUser();

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
