import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginated";
import { removeEmptyKeys } from "@/utils/queryParams";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export type FetchExercisesResponseData = {
  uuid: string;
  id: number;
  status: number;
  title: string;
  difficulty: number | null;
  createdAt: Date;
  category: {
    uuid: string;
    name: string;
    id: number;
  } | null;
  author: {
    uuid: string;
    name: string;
    surname: string;
    email: string;
    avatarUrl: string | null;
    avatarBgColor: string;
  };
};
type FetchPaginatedExercisesResponse =
  IPaginatedDocs<FetchExercisesResponseData>;

export type IFetchExercisesParams = IPaginationParams;
interface UseFetchExercisesConfig {
  enabled?: boolean;
}

export const useFetchExercises = (
  params?: IFetchExercisesParams,
  config?: UseFetchExercisesConfig,
) => {
  const { apiBase } = useAxios();

  /** Normaliza os params removendo chaves vazias — estabiliza a queryKey */
  const normalizedParams = useMemo(() => removeEmptyKeys(params), [params]);

  const {
    data: exercisesRecords,
    isFetching: isFetchingExercises,
    error: exercisesError,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: exerciseQueryKeyFactory.pages(normalizedParams),
    queryFn: async ({ signal }) => {
      const { data: response } =
        await apiBase.get<FetchPaginatedExercisesResponse>("/exercise", {
          params: normalizedParams,
          signal,
        });

      // Semeia o cache individual de cada exercício para navegação cache-first
      response?.data?.forEach((exercise) => {
        if (exercise.uuid) {
          setItemInCache<FetchExercisesResponseData>(
            exerciseQueryKeyFactory.row(exercise.uuid),
            exercise,
          );
        }
      });

      return (
        response ?? { data: [], total: 0, limit: 10, page: 1, totalPages: 0 }
      );
    },
    retry: 0,
    enabled: config?.enabled ?? true,
  });

  return {
    exercisesRecords,
    isFetchingExercises,
    exercisesError,
    refetchExercises,
  };
};
