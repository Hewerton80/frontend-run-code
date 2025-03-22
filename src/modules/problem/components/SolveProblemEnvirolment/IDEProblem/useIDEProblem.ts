import { useLanguage } from "@/modules/language/hooks/useLanguage";
import { IProblem } from "@/modules/problem/problemTypes";
import { useTestCode } from "@/modules/submission/hooks/useTestCode";
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

  const { isTestingCode, testCode, testCodeError, testCodeResponse } =
    useTestCode(problem?.id);

  const { languageMode } = useLanguage();

  const [sourceCode, setSourceCode] = useState(
    getDraftsCodeFromLocalStorage?.()?.[problem?.id] || ""
  );

  const sourceCodeRef = useRef(sourceCode);

  useEffect(() => {
    sourceCodeRef.current = sourceCode;
  }, [sourceCode]);

  useEffect(() => {
    const isInterval = setInterval(() => {
      const drafts = getDraftsCodeFromLocalStorage() || {};
      drafts[problem.id] = sourceCodeRef.current;

      setCookie(CONSTANTS.COOKIES_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
    }, 5000);

    return () => {
      clearInterval(isInterval);
    };
  }, [problem?.id]);

  const changeSourceCode = (value: string) => {
    setSourceCode(value);
  };

  const handleTestCode = () => {
    testCode({ sourceCode, language: languageMode });
  };

  return {
    sourceCode,
    isTestingCode,
    testCodeError,
    testCodeResponse,
    changeSourceCode,
    testCode: handleTestCode,
  };
};
