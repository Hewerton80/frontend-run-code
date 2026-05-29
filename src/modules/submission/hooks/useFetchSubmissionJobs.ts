import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { SubmissionStatus } from "../submissionType";
import { submissionQueryKeyFactory } from "@/modules/submission/utils/submissionQueryKeyFactory";

export interface SubmissionTestCaseResult {
  match: boolean;
  output: string;
  runtime: number;
  memory: number;
  status: null | SubmissionStatus;
  inputs: string[];
  expectedOutput: string;
}

export interface SubmissionResultSummary {
  score: number;
  testCasesResults: SubmissionTestCaseResult[];
  status: SubmissionStatus;
}

export interface SubmissionJobResponse {
  jobId: string;
  submissionUuid: string;
  exerciseUuId: string;
  listId: number | null;
  isProcessing: boolean;
  jobState: string;
  result: SubmissionResultSummary | null;
  processedOn: number | null;
  finishedOn: number | null;
  failedReason: string | null;
}

export const useFetchSubmissionJobs = () => {
  const { apiBase } = useAxios();
  const {
    data: submissionJobs,
    error: submissionJobsError,
    isFetching: isFetchingSubmissionJobs,
    refetch: fetchSubmissionJobs,
  } = useQuery({
    queryKey: submissionQueryKeyFactory.jobs(),
    queryFn: ({ signal }) =>
      apiBase
        .get<SubmissionJobResponse[]>("/submission/me/jobs", { signal })
        .then((res) => res.data),
    enabled: false,
    retry: 0,
  });
  return {
    submissionJobs,
    submissionJobsError,
    isFetchingSubmissionJobs,
    fetchSubmissionJobs,
  };
};
