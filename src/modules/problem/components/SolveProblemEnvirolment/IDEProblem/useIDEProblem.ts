import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { useGetProblem } from "@/modules/problem/hooks/useGetProblem";
import { IProblem } from "@/modules/problem/problemTypes";
import { useSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useIDEProblem = (problem: IProblem) => {
  const params = useParams<{
    listId?: string;
    classroomId?: string;
  }>();

  // const { isLoadingProblem, problem, problemError, refetchProblem } =
  //   useGetProblem({
  //     problemId: params?.problemId || "",
  //     classroomId: params?.classroomId,
  //     listId: params?.listId,
  //   });

  const { submitCode, isSubmitting, submitError, submitResponse } =
    useSubmissionCode(problem?.id || "");

  const { languageMode, changeLanguageMode } = useLanguage();

  const [sourceCode, setSourceCode] = useState("");

  const sourceCodeRef = useRef(sourceCode);

  useEffect(() => {
    sourceCodeRef.current = sourceCode;
  }, [sourceCode]);

  useEffect(() => {
    if (problem?.submissionStats?.sourceCode) {
      setSourceCode(problem?.submissionStats?.sourceCode || "");
    }
    if (problem?.submissionStats?.language) {
      changeLanguageMode(problem.submissionStats?.language);
    }
  }, [problem, changeLanguageMode]);

  // useEffect(() => {
  //   const isInterval = setInterval(() => {
  //     const drafts = getDraftsCodeFromLocalStorage() || {};
  //     if (problem?.id) {
  //       drafts[problem.id] = sourceCodeRef.current;
  //     }
  //     setCookie(CONSTANTS.COOKIES_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
  //   }, 5000);

  //   return () => {
  //     clearInterval(isInterval);
  //   };
  // }, [problem?.id]);

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
