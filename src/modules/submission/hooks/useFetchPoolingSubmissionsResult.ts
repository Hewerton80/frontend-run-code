import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import { useFetchSubmissionJobs } from "./useFetchSubmissionJobs";
import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";
import { updateCachedExerciseOfList } from "@/modules/exercise/utils/updateCachedExerciseOfList";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { SubmissionStatus } from "../submissionType";

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
      submissionJobs.forEach((job) => {
        const result = job.result;

        updateCachedExerciseOfList(
          job.exerciseUuId!,
          job.listId!,
          (prevExerciseData) => {
            if (!prevExerciseData) return prevExerciseData;
            if (
              prevExerciseData.submissionStatus === SubmissionStatus.ACCEPTED
            ) {
              return prevExerciseData;
            }

            if (result?.isFirstCorrectSubmission) {
              return {
                ...prevExerciseData,
                submissionStatus: prevExerciseData.submissionStatus,
              };
            }
          },
        );
        // updateCachedListOfClassroom
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
