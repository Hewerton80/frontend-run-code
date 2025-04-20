import { usePagination } from "@/hooks/usePagination";
import { IGetListProblemsParams, useGetLists } from "../../hooks/useGetLists";

export const useTableLists = () => {
  const { goToPage, paginationParams } = usePagination();
  const listsParams: IGetListProblemsParams = {
    ...paginationParams,
  };
  const {
    refetchListProblems,
    listProblems,
    isListProblemsLoading,
    listProblemsError,
  } = useGetLists(listsParams);

  return {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    goToPage,
    refetchListProblems,
  };
};
