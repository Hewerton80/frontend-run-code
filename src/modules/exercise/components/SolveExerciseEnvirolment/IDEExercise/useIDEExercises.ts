import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { useGetExercise } from "@/modules/exercise/hooks/useGetExercise";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { useSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useIDEExercise = (exercise: IExercise) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();

  // const { isLoadingExercise, exercise, exerciseError, refetchExercise } =
  //   useGetExercise({
  //     exerciseId: params?.exerciseId || "",
  //     classroomId: params?.classroomId,
  //     listId: params?.listId,
  //   });

  const { submitCode, isSubmitting, submitError, submitResponse } =
    useSubmissionCode(exercise?.uuid || "");

  const { languageMode, changeLanguageMode } = useLanguage();

  const [sourceCode, setSourceCode] = useState("");

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
  //     setCookie(CONSTANTS.COOKIES_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
  //   }, 5000);

  //   return () => {
  //     clearInterval(isInterval);
  //   };
  // }, [exercise?.id]);

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  const handleSubmitCode = () => {
    submitCode({
      sourceCode,
      language: languageMode,
      classroomId: params?.classroomId,
      listId: params?.listId,
    });
  };

  return {
    sourceCode,
    isSubmitting,
    submitError,
    submitResponse,
    changeSourceCode,
    submitCode: handleSubmitCode,
  };
};
