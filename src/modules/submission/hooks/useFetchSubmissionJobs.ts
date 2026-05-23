import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { SubmissionQueryKeys, SubmissionStatus } from "../submissionType";

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
  isFirstCorrectSubmission: boolean;
  status: SubmissionStatus;
}

export interface SubmissionJobResponse {
  jobId: string;
  submissionUuid: string;
  exerciseUuId: string;
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
    queryKey: [SubmissionQueryKeys.Jobs],
    queryFn: ({ signal }) =>
      apiBase
        .get<SubmissionJobResponse[]>("/submission/me/jobs", { signal })
        .then((res) => res.data),
    enabled: false,
  });
  return {
    submissionJobs,
    submissionJobsError,
    isFetchingSubmissionJobs,
    fetchSubmissionJobs,
  };
};
