import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import { useFetchSubmissionJobs } from "./useFetchSubmissionJobs";
import { updateCachedExerciseOfList } from "@/modules/exercise/utils/updateCachedExerciseOfList";
import { SubmissionStatus } from "../submissionType";
import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";

export const useFetchPoolingSubmissionsResult = () => {
  const { cachedSubmissionJobs, setCachedSubmissionJobs } =
    useCachedSubmissionJobs();
  const { fetchSubmissionJobs } = useFetchSubmissionJobs();

  const isPoolingSubmissionResult = useMemo(
    () => cachedSubmissionJobs.some((job) => job.isProcessing),
    [cachedSubmissionJobs],
  );

  const handleFetchSubmissionJobs = useCallback(async () => {
    const { data: submissionJobs } = await fetchSubmissionJobs();
    if (submissionJobs && submissionJobs.length > 0) {
      submissionJobs
        .filter((job) => !!job?.listId)
        .forEach((job) => {
          const result = job.result;
          updateCachedExerciseOfList(
            job.exerciseUuId!,
            job.listId!,

            (prevExerciseData) => {
              if (!prevExerciseData) return prevExerciseData;
              const prevSubmissionStatus = prevExerciseData?.submissionStatus;
              if (prevSubmissionStatus === SubmissionStatus.ACCEPTED) {
                return prevExerciseData;
              }
              return { ...prevExerciseData, submissionStatus: result?.status };
            },
          );

          if (result?.status !== SubmissionStatus.ACCEPTED) return;

          updateCachedListOfClassroom(job.listId!, (prevListData) => {
            if (!prevListData) return prevListData;
            return {
              ...prevListData,
              solvedsMap: {
                ...prevListData.solvedsMap,
                [job.exerciseUuId!]: true,
              },
            };
          });
        });
      setCachedSubmissionJobs(submissionJobs);
    }
  }, [fetchSubmissionJobs, setCachedSubmissionJobs]);

  const timer = useRef<any>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPoolingSubmissionResult) {
      clearTimer();
      return;
    }

    timer.current = setInterval(() => {
      if (isPoolingSubmissionResult) {
        handleFetchSubmissionJobs();
      }
    }, 1500);
    return () => clearTimer();
  }, [isPoolingSubmissionResult, clearTimer, handleFetchSubmissionJobs]);
};
