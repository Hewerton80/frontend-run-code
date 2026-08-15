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
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { updateCachedStandaloneExercise } from "@/modules/exercise/utils/updateCachedStandaloneExercise";

export const useFetchPoolingSubmissionsResult = () => {
  const { setCachedSubmissionJobs } = useCachedSubmissionJobs();

  const { loggedUser, setLoggedUser } = useLoggedUser();

  const activeJobIds = useMemo(
    () => loggedUser?.activeJobIds || [],
    [loggedUser],
  );

  const isPoolingSubmissionResult = useMemo(
    () => activeJobIds.length > 0,
    [activeJobIds],
  );
  const { fetchSubmissionJobs } = useFetchSubmissionJobs(activeJobIds);

  const handleUpdateCachedStandaloneExercise = useCallback(
    (job: SubmissionJobResponse) => {
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
          const currentMySubmissionStatus = prevExerciseData?.submissionStats;
          const currnetMyCorrectSubmissionsCount =
            currentMySubmissionStatus?.correctSubmissionsCount || 0;
          const currentMyIncorrectSubmissionsCount =
            currentMySubmissionStatus?.incorrectSubmissionsCount || 0;

          return {
            ...prevExerciseData,
            submissionsCount: currrentAllSubmissionsCount + 1,
            solvedSubmissionsCount: solvedByFirstTime
              ? currentAllSolvedSubmissionsCount + 1
              : currentAllSolvedSubmissionsCount,
            wrongUntilSolvedSubmissionsCount:
              !justGotAccepted && !wasAlreadyAccepted
                ? currentMyIncorrectSubmissionsCount + 1
                : currentMyIncorrectSubmissionsCount,
            submissionStats: currentMySubmissionStatus
              ? {
                  ...currentMySubmissionStatus,

                  correctSubmissionsCount: justGotAccepted
                    ? currnetMyCorrectSubmissionsCount + 1
                    : currnetMyCorrectSubmissionsCount,
                  incorrectSubmissionsCount: !justGotAccepted
                    ? currentMyIncorrectSubmissionsCount + 1
                    : currentMyIncorrectSubmissionsCount,
                }
              : undefined,
          };
        },
      );
    },
    [],
  );

  const handleUpdateCachedExerciseOfList = useCallback(
    (job: SubmissionJobResponse) => {
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
    (job: SubmissionJobResponse) => {
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

  const handleUpdateCachedClassroom = useCallback(
    (job: SubmissionJobResponse) => {
      const jobHasFinished =
        job.jobState === "completed" || job.jobState === "failed";
      if (!jobHasFinished) return;
      const newUserStats = job.result?.newUserStats;
      if (!newUserStats) return;
      updateCachedClassroom(job.exerciseUuId!, (prevClassroomData) => {
        if (!prevClassroomData) return prevClassroomData;
        return { ...prevClassroomData, userStats: newUserStats };
      });
    },
    [],
  );

  const handleUpdateCachedLoggedUser = useCallback(
    (submissionJobs: SubmissionJobResponse[]) => {
      setLoggedUser((prevLoggedUser) => {
        if (!prevLoggedUser) return prevLoggedUser;

        return {
          ...prevLoggedUser,
          activeJobIds: submissionJobs
            .filter((job) => job.isProcessing)
            .map((job) => job.jobId),
        };
      });
    },
    [setLoggedUser],
  );

  const handleFetchSubmissionJobs = useCallback(async () => {
    const { data: submissionJobs } = await fetchSubmissionJobs();
    if (!submissionJobs?.length) {
      setCachedSubmissionJobs([]);
      handleUpdateCachedLoggedUser([]);
      return;
    }
    handleUpdateCachedLoggedUser(submissionJobs);
    setCachedSubmissionJobs(submissionJobs);

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
    setCachedSubmissionJobs,
    handleUpdateCachedLoggedUser,
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
