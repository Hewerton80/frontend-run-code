import { SubmissionStatus } from "@/modules/submission/submissionType";

export interface ExecutionResult {
  output: string;
  runtime: number; // em milissegundos
  memory: number; // em MB
  status: null | SubmissionStatus;
}

export interface ExecutionEngineParams {
  code: string;
  input: string;
  //   expectedOutput?: string;
  timeLimit?: number;
  memoryLimit?: number;
}
