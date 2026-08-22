import { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmissionStatus } from "../types/SubmissionStatusEnum";
import { useCachedSubmissionJobs } from "./useCachedSubmissionJobs";
import { useFetchSubmissionJobs } from "./useFetchSubmissionJobs";
import { updateCachedExerciseOfList } from "@/modules/exercise/utils/updateCachedExerciseOfList";

import { updateCachedListOfClassroom } from "@/modules/list/utils/updateCachedListOfClassroom";
import { updateCachedClassroom } from "@/modules/classroom/utils/updateCachedClassroom";
import { updateCachedStandaloneExercise } from "@/modules/exercise/utils/updateCachedStandaloneExercise";
import { SubmissionJobDto } from "../types/SubmissionJobDto";

export const useFetchPoolingSubmissionsResult = () => {
  const { submissionJobs, hasActiveJobs, setSubmimissionJobs } =
    useCachedSubmissionJobs();

  const activeJobIds = useMemo(
    () =>
      submissionJobs?.filter((job) => job.isProcessing).map((job) => job.jobId),
    [submissionJobs],
  );

  const { fetchSubmissionJobs } = useFetchSubmissionJobs(activeJobIds);

  const handleUpdateCachedStandaloneExercise = useCallback(
    (job: SubmissionJobDto) => {
      const jobHasFinished =
        job.jobState === "completed" || job.jobState === "failed";
      if (!jobHasFinished) return;

      updateCachedStandaloneExercise(
        {
          exerciseUuId: job.exerciseUuId!,
          classroomUuId: job.classroomUuId || undefined,
          listId: job.listId || undefined,
        },
        (prevExerciseData) => {
          if (!prevExerciseData) return prevExerciseData;

          const result = job.result;

          const justGotAccepted = result?.status === SubmissionStatus.ACCEPTED;
          const wasAlreadyAccepted = result?.wasAlreadyAccepted;
          const solvedByFirstTime = justGotAccepted && !wasAlreadyAccepted;

          const currrentAllSubmissionsCount =
            prevExerciseData?.submissionsCount || 0;

          const currentAllSolvedSubmissionsCount =
            prevExerciseData?.solvedSubmissionsCount || 0;
          const currentAllWrongUntilSolvedSubmissionsCount =
            prevExerciseData?.wrongUntilSolvedSubmissionsCount || 0;

          const currentMySubmissionStatus = prevExerciseData?.submissionStats;

          const currentMyWasAlreadyAccepted =
            currentMySubmissionStatus?.wasAlreadyAccepted || false;

          return {
            ...prevExerciseData,
            submissionsCount: currrentAllSubmissionsCount + 1,
            solvedSubmissionsCount: solvedByFirstTime
              ? currentAllSolvedSubmissionsCount + 1
              : currentAllSolvedSubmissionsCount,
            wrongUntilSolvedSubmissionsCount:
              !justGotAccepted && !wasAlreadyAccepted
                ? currentAllWrongUntilSolvedSubmissionsCount + 1
                : currentAllWrongUntilSolvedSubmissionsCount,
            submissionStats: currentMySubmissionStatus
              ? {
                  ...currentMySubmissionStatus,

                  wasAlreadyAccepted:
                    justGotAccepted ||
                    wasAlreadyAccepted ||
                    currentMyWasAlreadyAccepted,
                }
              : undefined,
          };
        },
      );
    },
    [],
  );

  const handleUpdateCachedExerciseOfList = useCallback(
    (job: SubmissionJobDto) => {
      updateCachedExerciseOfList(
        job.exerciseUuId!,
        job.listId!,
        (prevExerciseData) => {
          if (!prevExerciseData) return prevExerciseData;
          const result = job.result;
          const submissionStatus = result?.status;
          const justGotAccepted =
            submissionStatus === SubmissionStatus.ACCEPTED;
          const wasAlreadyAccepted = result?.wasAlreadyAccepted;
          const isProssing = job.isProcessing;
          return {
            ...prevExerciseData,
            submissionStatus: isProssing
              ? submissionStatus
              : wasAlreadyAccepted || justGotAccepted
                ? SubmissionStatus.ACCEPTED
                : submissionStatus,
          };
        },
      );
    },
    [],
  );

  const handleUpdateCachedListOfClassroom = useCallback(
    (job: SubmissionJobDto) => {
      const jobHasFinished =
        job.jobState === "completed" || job.jobState === "failed";
      if (!jobHasFinished) return;
      if (job?.result?.wasAlreadyAccepted) return;
      if (job.result?.status !== SubmissionStatus.ACCEPTED) return;

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

  const handleUpdateCachedClassroom = useCallback((job: SubmissionJobDto) => {
    const jobHasFinished =
      job.jobState === "completed" || job.jobState === "failed";
    if (!jobHasFinished) return;
    const newUserStats = job.result?.newUserStats;
    if (!newUserStats) return;
    updateCachedClassroom(job.exerciseUuId!, (prevClassroomData) => {
      if (!prevClassroomData) return prevClassroomData;
      return { ...prevClassroomData, userStats: newUserStats };
    });
  }, []);

  const handleFetchSubmissionJobs = useCallback(async () => {
    const { data: submissionJobs } = await fetchSubmissionJobs();
    if (!submissionJobs?.length) {
      setSubmimissionJobs([]);
      return;
    }
    setSubmimissionJobs(submissionJobs);

    submissionJobs.forEach((job) => {
      handleUpdateCachedStandaloneExercise(job);
      handleUpdateCachedListOfClassroom(job);
      handleUpdateCachedExerciseOfList(job);
      handleUpdateCachedClassroom(job);
    });
  }, [
    fetchSubmissionJobs,
    handleUpdateCachedExerciseOfList,
    handleUpdateCachedListOfClassroom,
    handleUpdateCachedClassroom,
    setSubmimissionJobs,
    handleUpdateCachedStandaloneExercise,
  ]);

  const timer = useRef<any>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!hasActiveJobs) {
      clearTimer();
      return;
    }

    timer.current = setInterval(() => {
      if (hasActiveJobs) {
        handleFetchSubmissionJobs();
      }
    }, 1500);
    return () => clearTimer();
  }, [hasActiveJobs, clearTimer, handleFetchSubmissionJobs]);
};
