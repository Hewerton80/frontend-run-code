import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { IProblem } from "@/modules/problem/problemTypes";
import { useSubmissionCode } from "@/modules/submission/hooks/useSubmitCode";
import { CONSTANTS } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { getCookie, setCookie } from "cookies-next/client";
interface CodeDrafts {
  [key: string]: string;
}

export const useIDEProblem = (problem: IProblem) => {
  const getDraftsCodeFromLocalStorage = () => {
    const drafts = getCookie(CONSTANTS.COOKIES_KEYS.CODE_DRAFTS);
    if (!drafts) return null;
    try {
      const parsedDrafts = JSON.parse(drafts) as CodeDrafts;
      return parsedDrafts || null;
    } catch (e) {
      return null;
    }
  };

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

  useEffect(() => {
    const isInterval = setInterval(() => {
      const drafts = getDraftsCodeFromLocalStorage() || {};
      if (problem?.id) {
        drafts[problem.id] = sourceCodeRef.current;
      }
      setCookie(CONSTANTS.COOKIES_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
    }, 5000);

    return () => {
      clearInterval(isInterval);
    };
  }, [problem?.id]);

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  const handleSubmitCode = () => {
    submitCode({
      sourceCode,
      language: languageMode,
      classroomId: problem?.classroomId,
      listId: problem?.listId,
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
