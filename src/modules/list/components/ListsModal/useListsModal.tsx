import useQueryParams from "@/hooks/useQueryParams";
import { IClassroom } from "@/modules/classroom/classroomType";
import { IGetListProblemsParams, useGetLists } from "../../hooks/useGetLists";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { ListProblemQueryKey } from "../../listProblemTypes";
import { useEffect } from "react";

export const useListsModal = (classroom?: IClassroom) => {
  const { queryParams, delQueryParams } = useQueryParams<{
    showModal: string;
  }>();

  const queryClient = useQueryClient();

  const { goToPage, paginationParams } = usePagination();
  const listsParams: IGetListProblemsParams = {
    ...paginationParams,
    notIn: classroom?.listsProblems?.map((list) => list.uuid).join(","),
  };
  const {
    refetchListProblems,
    listProblems,
    isListProblemsLoading,
    listProblemsError,
  } = useGetLists(listsParams);

  useEffect(() => {
    if (queryParams?.showModal !== "true") {
      queryClient.resetQueries({ queryKey: [ListProblemQueryKey.LIST] });
    }
  }, [queryParams, queryClient]);

  const closeModal = () => {
    delQueryParams("showModal");
  };

  return {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    closeModal,
    goToPage,
    refetchListProblems,
  };
};
