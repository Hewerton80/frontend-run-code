export enum SubmissionStatus {
  PENDING = 1,
  RUNNING = 2,
  ACCEPTED = 3,
  WRONG_ANSWER = 4,
  TIME_LIMIT_EXCEEDED = 5,
  MEMORY_LIMIT_EXCEEDED = 6,
  RUNTIME_ERROR = 7,
  COMPILATION_ERROR = 8,
  UNKNOWN_ERROR = 9,
  NO_OUTPUT = 11,
}

export type SubmissionStatusType = keyof typeof SubmissionStatus;
