import { SubmissionStatus } from "./SubmissionStatusEnum";

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

export interface SubmissionJobDto {
  jobId: string;
  submissionUuid: string;
  exerciseUuId: string;
  classroomUuId: string | null;
  listId: number | null;
  isProcessing: boolean;
  jobState: SubmissionJobState;
  result: SubmissionResultSummary | null;
  processedOn: number | null;
  finishedOn: number | null;
  failedReason: string | null;
}
