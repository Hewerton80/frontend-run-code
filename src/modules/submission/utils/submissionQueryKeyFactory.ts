import { SubmissionQueryKeys } from "@/modules/submission/submissionType";

/**
 * Factory de query keys do módulo submission.
 * Use sempre esta factory em vez de arrays inline para garantir
 * consistência, autocomplete e invalidação segura.
 */
export const submissionQueryKeyFactory = {
  /** Jobs de submissão do usuário logado */
  jobs: (activeJobIds: string[]) =>
    [SubmissionQueryKeys.Jobs, activeJobIds] as const,
  createSubmission: (exerciseUuId: string) =>
    [SubmissionQueryKeys.CreateSubmission, exerciseUuId] as const,
};
