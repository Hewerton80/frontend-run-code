import { useMutationState } from "@tanstack/react-query";
import { submissionQueryKeyFactory } from "../utils/submissionQueryKeyFactory";

export const useGetCreateSubmissionState = (exerciseUuId: string) => {
  const mutationStates = useMutationState({
    filters: {
      mutationKey: submissionQueryKeyFactory.createSubmission(exerciseUuId),
    },
    select: (mutation) => mutation.state,
  });
  return mutationStates[mutationStates.length - 1];
};
