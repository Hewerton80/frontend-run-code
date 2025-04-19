import { usePagination } from "@/hooks/usePagination";
import {
  IGetProblemsParams,
  useGetProblems,
} from "@/modules/problem/hooks/useGetProblems";

export const useProblems = () => {
  const { goToPage, paginationParams } = usePagination();
  const usersParams: IGetProblemsParams = {
    ...paginationParams,
  };
  const { isProblemsLoading, problems, problemsError, refetchProblems } =
    useGetProblems(usersParams);

  return {
    isProblemsLoading,
    problems,
    problemsError,
    goToPage,
    refetchProblems,
  };
};
