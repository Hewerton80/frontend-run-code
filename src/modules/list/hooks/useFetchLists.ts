import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { IList } from "../listTypes";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";

export interface IGetListExercisesParams extends IPaginationParams {
  notIn?: string;
}

export const useFetchLists = (
  listExercisesParams?: IGetListExercisesParams,
) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(
    () => removeEmptyKeys(listExercisesParams),
    [listExercisesParams],
  );

  const {
    data: listExercises,
    isFetching: isListExercisesLoading,
    error: listExercisesError,
    refetch: refetchListExercises,
  } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.pages(normalizedParams),
    queryFn: async ({ signal }) => {
      const res = await apiBase.get<IPaginatedDocs<IList>>("/list", {
        params: normalizedParams,
        signal,
      });
      return res.data ?? { data: [] };
    },
    retry: 0,
  });

  return {
    refetchListExercises,
    listExercises,
    isListExercisesLoading,
    listExercisesError,
  };
};
