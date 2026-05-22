import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { SubmissionQueryKeys } from "../submissionType";

export const useFetchSubimissionsStatus = (submissionId: string) => {
  const { apiBase } = useAxios();
  const {
    data: submissionStatus,
    error: submissionStatusError,
    isFetching: isFetchingSubmissionStatus,
    refetch: fetchSubmissionStatus,
  } = useQuery({
    queryKey: [SubmissionQueryKeys.Status, submissionId],
    queryFn: () =>
      apiBase.get(`/submission/${submissionId}/status`).then((res) => res.data),
    enabled: false,
  });
  return {
    submissionStatus,
    submissionStatusError,
    isFetchingSubmissionStatus,
    fetchSubmissionStatus,
  };
};
