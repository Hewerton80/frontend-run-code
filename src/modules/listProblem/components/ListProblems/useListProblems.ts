import { usePagination } from "@/hooks/usePagination";
import {
  IGetProblemsParams,
  useGetProblems,
} from "../../../problem/hooks/useGetProblems";

export const useListProblems = () => {
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
