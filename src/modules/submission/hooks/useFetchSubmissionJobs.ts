import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { SubmissionStatus } from "../submissionType";
import { submissionQueryKeyFactory } from "@/modules/submission/utils/submissionQueryKeyFactory";

export interface SubmissionTestCaseResult {
  input: string | null;
  output: string | null;
  expectedOutput: string | null;
  match: boolean;
  runtime: number;
  memory: number;
  isPublic: boolean;
  status: null | SubmissionStatus;
}

export interface SubmissionResultSummary {
  score: number;
  testCasesResults: SubmissionTestCaseResult[];
  status: SubmissionStatus;
  wasAlreadyAccepted: boolean;
  newUserStats?: {
    completedExercises: number;
    totalXp: number;
    progress: number;
    xpEarned: number;
  };
}
export type SubmissionJobState = "waiting" | "active" | "completed" | "failed";

export interface SubmissionJobResponse {
  jobId: string;
  submissionUuid: string;
  exerciseUuId: string;
  listId: number | null;
  isProcessing: boolean;
  jobState: SubmissionJobState;
  result: SubmissionResultSummary | null;
  processedOn: number | null;
  finishedOn: number | null;
  failedReason: string | null;
}

export const useFetchSubmissionJobs = (activeJobIds: string[]) => {
  const { apiBase } = useAxios();
  const {
    data: submissionJobs,
    error: submissionJobsError,
    isFetching: isFetchingSubmissionJobs,
    refetch: fetchSubmissionJobs,
  } = useQuery({
    queryKey: submissionQueryKeyFactory.jobs(activeJobIds),
    queryFn: ({ signal }) =>
      apiBase
        .get<
          SubmissionJobResponse[]
        >("/submission/me/jobs", { params: { activeJobIds: activeJobIds.join(",") }, signal })
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
