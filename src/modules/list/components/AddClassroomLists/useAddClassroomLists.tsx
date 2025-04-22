import useQueryParams from "@/hooks/useQueryParams";
import { IClassroom } from "@/modules/classroom/classroomType";
import { IGetListProblemsParams, useGetLists } from "../../hooks/useGetLists";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { ListProblemQueryKey } from "../../listProblemTypes";
import { useEffect } from "react";
import { useGetMyClassrooms } from "@/modules/classroom/hooks/useGetMyClassrooms";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useParams } from "next/navigation";

export const useAddClassroomLists = () => {
  // const { queryParams, delQueryParams } = useQueryParams<{
  //   classroomId: string;
  // }>();
  const params = useParams<{ classroomId: string }>();

  const { classroom, isLoadingClassroom } = useGetClassroomById(
    params?.classroomId
  );

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

  // useEffect(() => {
  //   if (show) {
  //     refetchListProblems();
  //   }
  // else {
  //   queryClient.resetQueries({ queryKey: [ListProblemQueryKey.LIST] });
  // }
  // }, [show, refetchListProblems]);

  // useEffect(() => {
  //   if (queryParams?.showModal !== "true") {
  //     queryClient.resetQueries({ queryKey: [ListProblemQueryKey.LIST] });
  //   }
  // }, [queryParams, queryClient]);

  // const handleCloseModal = () => {
  // delQueryParams("showModal");
  // onClose?.();
  //   queryClient.resetQueries({ queryKey: [ListProblemQueryKey.LIST] });
  // };

  return {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    classroom,
    // handleCloseModal,
    isLoadingClassroom,
    goToPage,
    refetchListProblems,
  };
};
