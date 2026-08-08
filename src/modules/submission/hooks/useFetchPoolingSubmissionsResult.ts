import { useCallback, useEffect, useMemo, useRef } from "react";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import {
  SubmissionJobResponse,
  useFetchSubmissionJobs,
} from "./useFetchSubmissionJobs";
import { updateCachedExerciseOfList } from "@/modules/exercise/utils/updateCachedExerciseOfList";
import { SubmissionStatus } from "../submissionType";
import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";
import { updateCachedClassroom } from "@/modules/classroom/utils/updateCachedClassroom";

export const useFetchPoolingSubmissionsResult = () => {
  const { cachedSubmissionJobs, setCachedSubmissionJobs } =
    useCachedSubmissionJobs();

  const { fetchSubmissionJobs } = useFetchSubmissionJobs();

  // TODO adicionar ao corpo so usuario activeJobs

  const isPoolingSubmissionResult = useMemo(
    () => cachedSubmissionJobs.some((job) => job.isProcessing),
    [cachedSubmissionJobs],
  );

  const handleUpdateCachedExerciseOfList = useCallback(
    (job: SubmissionJobResponse) => {
      const submissionStatus = job.result?.status;

      updateCachedExerciseOfList(
        job.exerciseUuId!,
        job.listId!,
        (prevExerciseData) => {
          if (!prevExerciseData) return prevExerciseData;
          return { ...prevExerciseData, submissionStatus };
        },
      );
    },
    [],
  );

  const handleUpdateCachedListOfClassroom = useCallback(
    (job: SubmissionJobResponse) => {
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
    },
    [],
  );

  const handleUpdateCachedClassroom = useCallback(
    (job: SubmissionJobResponse) => {
      const newUserStats = job.result?.newUserStats;
      if (!newUserStats) return;
      updateCachedClassroom(job.exerciseUuId!, (prevClassroomData) => {
        if (!prevClassroomData) return prevClassroomData;
        return { ...prevClassroomData, userStats: newUserStats };
      });
    },
    [],
  );

  const handleFetchSubmissionJobs = useCallback(async () => {
    const { data: submissionJobs } = await fetchSubmissionJobs();
    if (!submissionJobs?.length) return;
    setCachedSubmissionJobs(submissionJobs);

    submissionJobs
      .filter(
        (job) => !!job?.listId && job?.result?.wasAlreadyAccepted !== true,
      )
      .forEach((job) => {
        handleUpdateCachedExerciseOfList(job);
        if (job?.result?.status !== SubmissionStatus.ACCEPTED) return;
        handleUpdateCachedListOfClassroom(job);
        handleUpdateCachedClassroom(job);
      });
  }, [
    fetchSubmissionJobs,
    handleUpdateCachedExerciseOfList,
    handleUpdateCachedListOfClassroom,
    handleUpdateCachedClassroom,
    setCachedSubmissionJobs,
  ]);

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
