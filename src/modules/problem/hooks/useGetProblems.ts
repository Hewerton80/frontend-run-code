import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IProblem, ProblemQueryKey } from "../problemTypes";
import { IPagined } from "@/types/paginad";

export const useGetProblems = () => {
  const { apiBase } = useAxios();
  const {
    data: problems,
    isFetching: isProblemsLoading,
    error: problemsError,
    refetch: refetchProblems,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPagined<IProblem>>("/problem")
        .then((res) => res.data || { data: [] }),
    queryKey: [ProblemQueryKey.PROBLEMS],
    enabled: true,
  });

  return {
    refetchProblems,
    problems,
    isProblemsLoading,
    problemsError,
  };
};
