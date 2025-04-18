import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IProblem, ProblemQueryKey } from "../problemTypes";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";

export interface IGetProblemsParams extends IPaginationParams {}

export const useGetProblems = (problemsParams?: IGetProblemsParams) => {
  const { apiBase } = useAxios();
  const {
    data: problems,
    isFetching: isProblemsLoading,
    error: problemsError,
    refetch: refetchProblems,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IProblem>>("/problem", {
          params: removeEmptyKeys(problemsParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [
      ProblemQueryKey.PROBLEMS,
      ...Object.values(removeEmptyKeys(problemsParams)),
    ],
    enabled: true,
  });

  return {
    refetchProblems,
    problems,
    isProblemsLoading,
    problemsError,
  };
};
