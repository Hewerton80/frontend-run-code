import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface TestCodeBody {
  sourceCode: string;
  language: string;
}

export interface ResultTestCode {
  inputs: string[];
  expectedOutput: string;
  output: string;
  status: "OK" | "FAIL";
}

export interface TestCodeBodyResponse {
  score: number;
  tests: ResultTestCode[];
}

interface TestCodeBodyErrorResponse {
  description?: string;
}

export const useTestCode = (problemId: string) => {
  const { apiBase } = useAxios();

  const {
    mutate: testCode,
    isPending: isTestingCode,
    data: testCodeResponse,
    error: testCodeError,
  } = useMutation({
    mutationFn: (testCodeBody: TestCodeBody) =>
      apiBase
        .post<TestCodeBodyResponse>(
          `submission/test/${problemId}`,
          testCodeBody
        )
        .then((res) => res.data),
  });

  const getHandleError = () => {
    if (!testCodeError) return null;
    const handleError = (testCodeError as any)?.response
      ?.data as TestCodeBodyErrorResponse;
    console.log(handleError);
    if (handleError?.description) return handleError;
    return { description: "Something went wrong 😭" };
  };

  // useEffect(() => {
  //   console.log(testCodeResponse);
  // }, [testCodeResponse]);

  return {
    testCode,
    isTestingCode,
    testCodeResponse,
    testCodeError: getHandleError(),
  };
};
