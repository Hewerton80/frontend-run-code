import { usePagination } from "@/hooks/usePagination";
import {
  IGetListProblemsParams,
  useGetListProblems,
} from "../../hooks/useGetListProblems";

export const useListListProblems = () => {
  const { goToPage, paginationParams } = usePagination();
  const usersParams: IGetListProblemsParams = {
    ...paginationParams,
  };
  const {
    refetchListProblems,
    listProblems,
    isListProblemsLoading,
    listProblemsError,
  } = useGetListProblems(usersParams);

  return {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    goToPage,
    refetchListProblems,
  };
};
