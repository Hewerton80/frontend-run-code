import { SubmissionQueryKeys } from "../types/SubmissionQueryKeys";

export const submissionQueryKeyFactory = {
  /** Jobs de submissão do usuário logado */
  jobs: (activeJobIds: string[]) =>
    [SubmissionQueryKeys.Jobs, activeJobIds] as const,
  createSubmission: (exerciseUuId: string) =>
    [SubmissionQueryKeys.CreateSubmission, exerciseUuId] as const,
};
