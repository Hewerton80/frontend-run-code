import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import { useFetchSubmissionJobs } from "./useFetchSubmissionJobs";
import { updateCachedExerciseOfList } from "@/modules/exercise/utils/updateCachedExerciseOfList";
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
      console.log("--------------------------------------------------");
      submissionJobs
        .filter((job) => !!job?.listId)
        .forEach((job, index) => {
          console.log(index, { job });
          const result = job.result;
          updateCachedExerciseOfList(
            job.exerciseUuId!,
            job.listId!,
            // (prevExerciseData) => {
            //   if (!prevExerciseData) return prevExerciseData;

            //   return {
            //     ...prevExerciseData,
            //     submissionStatus: SubmissionStatus.ACCEPTED,
            //   };
            // },
            (prevExerciseData) => {
              console.log({ prevExerciseData });
              if (!prevExerciseData) return prevExerciseData;
              if (
                prevExerciseData?.submissionStatus === SubmissionStatus.ACCEPTED
              ) {
                return prevExerciseData;
              }

              // if (result?.isFirstCorrectSubmission) {
              return {
                ...prevExerciseData,
                submissionStatus: result?.status,
              };
              // }
            },
          );
          // updateCachedListOfClassroom
        });
      console.log("--------------------------------------------------");
      console.log("");
      console.log("");
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
