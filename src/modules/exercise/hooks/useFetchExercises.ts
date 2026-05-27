import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export type IFetchExercisesParams = IPaginationParams;

/**
 * Busca a lista paginada de exercícios.
 * Semeia o cache individual de cada exercício via `setItemInCache` para
 * permitir navegação cache-first ao detalhe.
 * Suporta cancelamento automático via AbortSignal.
 */
export const useFetchExercises = (params?: IFetchExercisesParams) => {
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
      const { data: response } = await apiBase.get<IPaginatedDocs<IExercise>>(
        "/exercise",
        { params: normalizedParams, signal },
      );

      // Semeia o cache individual de cada exercício para navegação cache-first
      response?.data?.forEach((exercise) => {
        if (exercise.uuid) {
          setItemInCache<IExercise>(
            exerciseQueryKeyFactory.detail(exercise.uuid),
            exercise,
          );
        }
      });

      return (
        response ?? { data: [], total: 0, limit: 10, page: 1, totalPages: 0 }
      );
    },
    retry: 0,
  });

  return {
    exercisesRecords,
    isFetchingExercises,
    exercisesError,
    refetchExercises,
  };
};
