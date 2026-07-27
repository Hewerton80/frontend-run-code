import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { useCreateSubmission } from "@/modules/submission/hooks/useCreateSubmission";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";
import { useGetCachedClassromById } from "@/modules/classroom/hooks/useGetCachedClassromById";
import { LANGUAGES_CONFIG_MAP } from "@/modules/language/utils/languagesConfig";
import { FetchExerciseByUuIdResponse } from "@/modules/exercise/hooks/useFetchExerciseByUuId";

export const useIDEExercise = (exercise: FetchExerciseByUuIdResponse) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();

  const { cachedClassroom: classroom } = useGetCachedClassromById(
    params?.classroomId!,
  );

  const { createSubmission, isSubmitting, submitResponse } =
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
        onSuccess: (data) => addCachedSubmissionJob(exercise?.uuid!, data),
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
    submitResponse,
    avaliableLanguages,
    changeSourceCode,
    createSubmission: handlecreateSubmission,
  };
};
