import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useCreateSubmission } from "@/modules/submission/hooks/useCreateSubmission";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";
import { useGetCachedClassrom } from "@/modules/classroom/hooks/useGetCachedClassrom";
import { LANGUAGES_CONFIG_MAP } from "@/modules/language/utils/languagesConfig";

export const useIDEExercise = (exercise: IExercise) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();

  const { cachedClassroom: classroom } = useGetCachedClassrom(
    params?.classroomId!,
  );

  const { createSubmission, isSubmitting, submitError, submitResponse } =
    useCreateSubmission(exercise?.uuid || "");

  const { languageMode, changeLanguageMode } = useLanguage();

  const [sourceCode, setSourceCode] = useState("");

  const avaliableLanguages = useMemo(() => {
    return classroom?.languages?.split(",");
  }, [classroom]);

  const { cachedSubmissionJobs, addCachedSubmissionJob } =
    useCachedSubmissionJobs();

  // const sourceCodeRef = useRef(sourceCode);

  // useEffect(() => {
  //   sourceCodeRef.current = sourceCode;
  // }, [sourceCode]);

  useEffect(() => {
    const submissionStats = exercise?.submissionStats;
    const sourceCode = submissionStats?.sourceCode;
    const language = submissionStats?.language;
    const languageConfig =
      LANGUAGES_CONFIG_MAP?.[language as keyof typeof LANGUAGES_CONFIG_MAP];
    if (sourceCode) {
      setSourceCode(sourceCode);
    }
    if (languageConfig) {
      changeLanguageMode(languageConfig);
    }
  }, [exercise, changeLanguageMode]);

  // useEffect(() => {
  //   const isInterval = setInterval(() => {
  //     const drafts = getDraftsCodeFromLocalStorage() || {};
  //     if (exercise?.id) {
  //       drafts[exercise.id] = sourceCodeRef.current;
  //     }
  //     setCookie(CONSTANTS.LOCAL_STORAGE_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
  //   }, 5000);

  //   return () => {
  //     clearInterval(isInterval);
  //   };
  // }, [exercise?.id]);

  const submissionsResult = useMemo(() => {
    const foundSubmissionResult = cachedSubmissionJobs.find(
      (job) => job.exerciseUuId === exercise?.uuid,
    );
    return foundSubmissionResult;
  }, [cachedSubmissionJobs, exercise?.uuid]);

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  const handlecreateSubmission = useCallback(() => {
    createSubmission(
      {
        sourceCode,
        language: languageMode.value,
        classroomId: params?.classroomId,
        listId: params?.listId ? parseInt(params?.listId) : undefined,
      },
      {
        onSuccess: (data) => {
          console.log("submit code response", data);
          addCachedSubmissionJob(exercise?.uuid!, data);
        },
      },
    );
  }, [
    createSubmission,
    sourceCode,
    languageMode,
    params?.classroomId,
    params?.listId,
    addCachedSubmissionJob,
    exercise?.uuid,
  ]);

  return {
    sourceCode,
    isSubmitting: isSubmitting || submissionsResult?.isProcessing,
    submitError,
    submitResponse,
    avaliableLanguages,
    changeSourceCode,
    submissionsResult: submissionsResult?.result,
    createSubmission: handlecreateSubmission,
  };
};
