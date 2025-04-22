import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { IListProblem, ListProblemQueryKey } from "../listProblemTypes";
import { isBoolean } from "@/utils/isType";

export interface IGetListProblemsParams extends IPaginationParams {
  notIn?: string;
}

export const useGetLists = (listProblemsParams?: IGetListProblemsParams) => {
  const { apiBase } = useAxios();
  const {
    data: listProblems,
    isFetching: isListProblemsLoading,
    error: listProblemsError,
    refetch: refetchListProblems,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IListProblem>>("/list-problems", {
          params: removeEmptyKeys(listProblemsParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [
      ListProblemQueryKey.LIST,
      ...Object.values(removeEmptyKeys(listProblemsParams)),
    ],
    enabled: true,
  });

  return {
    refetchListProblems,
    listProblems,
    isListProblemsLoading,
    listProblemsError,
  };
};
