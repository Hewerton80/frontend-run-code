import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useCreateSubmission } from "@/modules/submission/hooks/useCreateSubmission";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchClassroomById } from "@/modules/classroom/hooks/useFetchClassroomById";
import { useCachedSubmissionJobs } from "@/modules/submission/hooks/useCachedSubmissionJobs";

export const useIDEExercise = (exercise: IExercise) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();

  const { classroom } = useFetchClassroomById(params?.classroomId!);

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
    if (exercise?.submissionStats?.sourceCode) {
      setSourceCode(exercise?.submissionStats?.sourceCode || "");
    }
    if (exercise?.submissionStats?.language) {
      changeLanguageMode(exercise.submissionStats?.language);
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

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  const handlecreateSubmission = useCallback(() => {
    createSubmission(
      {
        sourceCode,
        language: languageMode,
        classroomId: params?.classroomId,
        listId: params?.listId,
      },
      {
        onSuccess: (data) => {
          console.log("submit code response", data);
          addCachedSubmissionJob(exercise?.uuid!, data);
          // setExerciseSubmissionStatus(exercise?.uuid!, data);
          // if (data?.isFirstCorrectSubmission && classroom?.uuid) {
          //   queryClient.setQueryData<IClassroom>(
          //     [ClassroomKeys.Details, classroom?.uuid],
          //     (currentClassroom) => {
          //       const listsRmp = [...(currentClassroom?.lists || [])]?.map(
          //         (list) => {
          //           return {
          //             ...list,
          //             solved:
          //               list?.uuid === params?.listId
          //                 ? (list?.solved || 0) + 1
          //                 : list?.solved || 0,
          //           };
          //         }
          //       ) as IClassroom;
          //       return {
          //         ...currentClassroom,
          //         lists: listsRmp,
          //       } as IClassroom;
          //     }
          //   );
          // }
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
    isSubmitting,
    submitError,
    submitResponse,
    avaliableLanguages,
    changeSourceCode,
    cachedSubmissionJobs,
    createSubmission: handlecreateSubmission,
  };
};
