import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { submissionQueryKeyFactory } from "@/modules/submission/utils/submissionQueryKeyFactory";
import { SubmissionJobDto } from "../types/SubmissionJobDto";

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
          SubmissionJobDto[]
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
