import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { SubmissionStatus } from "../submissionType";
import { SubmissionJobResponse } from "./useFetchSubmissionJobs";

interface SubmissionCodeBody {
  sourceCode: string;
  language: string;
  classroomId?: string;
  listId?: number;
}

export interface ResultSubmissionCode {
  inputs: string[];
  expectedOutput: string;
  output: string;
  status: SubmissionStatus;
}

interface SubmissionCodeBodyErrorResponse {
  description?: string;
}

export const useCreateSubmission = (exerciseId: string) => {
  const { apiBase } = useAxios();

  const {
    mutate: createSubmission,
    isPending: isSubmitting,
    data: submitResponse,
    error: submitError,
  } = useMutation({
    mutationFn: async (submitBody: SubmissionCodeBody) => {
      const { classroomId, listId, ...data } = submitBody;
      let url = `/submission/${exerciseId}`;
      if (classroomId && listId) {
        url += `/classroom/${classroomId}/list/${listId}`;
      }
      return apiBase
        .post<SubmissionJobResponse>(url, data)
        .then((res) => res.data);
    },
    retry: 0,
  });

  const getHandleError = () => {
    if (!submitError) return null;
    const handleError = (submitError as any)?.response
      ?.data as SubmissionCodeBodyErrorResponse;
    if (handleError?.description) return handleError;
    return { description: "Something went wrong 😭" };
  };

  return {
    createSubmission,
    isSubmitting,
    submitResponse,
    submitError: getHandleError(),
  };
};
