import { useCallback, useEffect, useRef } from "react";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import { usePoolingSubmissionsResult } from "./usePoolingSubmissionsResult";
import { useFetchSubmissionJobs } from "./useFetchSubmissionJobs";

export const useFetchPoolingSubmissionsResult = () => {
  const { cachedSubmissionJobs, setCachedSubmissionJobs } =
    useCachedSubmissionJobs();
  const { fetchSubmissionJobs } = useFetchSubmissionJobs();
  const {
    isPoolingSubmissionResult,
    startPoolingSubmissionResult,
    stopPoolingSubmissionResult,
  } = usePoolingSubmissionsResult();

  useEffect(() => {
    console.log("cachedSubmissionJobs changed", cachedSubmissionJobs);
    const someJobIsProcessing = cachedSubmissionJobs.some(
      (job) => job.isProcessing,
    );
    console.log("someJobIsProcessing", someJobIsProcessing);
    if (someJobIsProcessing) {
      startPoolingSubmissionResult();
      return;
    }
    stopPoolingSubmissionResult();
  }, [
    cachedSubmissionJobs,
    startPoolingSubmissionResult,
    stopPoolingSubmissionResult,
  ]);

  const handleFetchSubmissionJobs = useCallback(async () => {
    const { data: submissionJobs } = await fetchSubmissionJobs();
    if (submissionJobs && submissionJobs.length > 0) {
      console.log("fetched submission jobs", submissionJobs);
      setCachedSubmissionJobs(submissionJobs);
    }
  }, [fetchSubmissionJobs, setCachedSubmissionJobs]);

  const timer = useRef<number | null>(null);
  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    console.log("isPoolingSubmissionResult", isPoolingSubmissionResult);
    if (!isPoolingSubmissionResult) {
      clearTimer();
      return;
    }

    timer.current = setInterval(() => {
      if (isPoolingSubmissionResult) {
        handleFetchSubmissionJobs();
      }
    }, 1000);
    return () => clearTimer();
  }, [isPoolingSubmissionResult, clearTimer, handleFetchSubmissionJobs]);
};
