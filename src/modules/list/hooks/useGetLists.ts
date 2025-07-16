import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { IList, ListQueryKey } from "../listTypes";
import { isBoolean } from "@/utils/isType";

export interface IGetListExercisesParams extends IPaginationParams {
  notIn?: string;
}

export const useGetLists = (listExercisesParams?: IGetListExercisesParams) => {
  const { apiBase } = useAxios();
  const {
    data: listExercises,
    isFetching: isListExercisesLoading,
    error: listExercisesError,
    refetch: refetchListExercises,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IList>>("/list", {
          params: removeEmptyKeys(listExercisesParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [
      ListQueryKey.LIST,
      ...Object.values(removeEmptyKeys(listExercisesParams)),
    ],
    enabled: true,
  });

  return {
    refetchListExercises,
    listExercises,
    isListExercisesLoading,
    listExercisesError,
  };
};
