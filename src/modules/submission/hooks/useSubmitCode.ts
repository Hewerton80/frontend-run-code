import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface SubmissionCodeBody {
  sourceCode: string;
  language: string;
  classroomId?: string;
  listId?: string;
}

export interface ResultSubmissionCode {
  inputs: string[];
  expectedOutput: string;
  output: string;
  status: "OK" | "FAIL";
}

export interface SubmissionCodeBodyResponse {
  score: number;
  externalSubmissionResponse: ResultSubmissionCode[];
}

interface SubmissionCodeBodyErrorResponse {
  description?: string;
}

export const useSubmissionCode = (problemId: string) => {
  const { apiBase } = useAxios();

  const {
    mutate: submitCode,
    isPending: isSubmitting,
    data: submitResponse,
    error: submitError,
  } = useMutation({
    mutationFn: async (submitBody: SubmissionCodeBody) => {
      const { classroomId, listId, ...data } = submitBody;
      let url = `/submission/${problemId}`;
      if (classroomId && listId) {
        url += `/classroom/${classroomId}/list/${listId}`;
      }
      return apiBase
        .post<SubmissionCodeBodyResponse>(url, data)
        .then((res) => res.data);
    },
  });

  const getHandleError = () => {
    if (!submitError) return null;
    const handleError = (submitError as any)?.response
      ?.data as SubmissionCodeBodyErrorResponse;
    console.log(handleError);
    if (handleError?.description) return handleError;
    return { description: "Something went wrong 😭" };
  };

  return {
    submitCode,
    isSubmitting,
    submitResponse,
    submitError: getHandleError(),
  };
};
