import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IList } from "@/modules/list/listTypes";
import { listQueryKeyFactory } from "@/modules/list/utils/listQueryKeyFactory";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";

/**
 * Busca o detalhe de uma lista com seus exercícios.
 * Semeia o cache individual de cada exercício via `setItemInCache` para
 * que `useGetCachedExerciseOfList` possa ler sem HTTP.
 * Suporta cancelamento automático via AbortSignal.
 * Não executa sem `classroomId` e `listId`.
 */
export const useFetchList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();

  const {
    data: list,
    error: errorExercises,
    isFetching: isLoadingExercises,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: listQueryKeyFactory.detail(listId, classroomId),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<IList>(
        `/list/${listId}/classroom/${classroomId}`,
        { signal },
      );
      return data;
    },
    enabled: !!classroomId && !!listId,
    retry: 0,
  });

  /** IDs dos exercícios da lista — semeia o cache individual de cada exercício */
  const exerciseIdsOfList = useMemo(() => {
    return (
      list?.exercises?.map((exercise) => {
        if (exercise.uuid) {
          setItemInCache(
            exerciseQueryKeyFactory.ofList(exercise.uuid, listId),
            exercise,
          );
        }
        return exercise.uuid!;
      }) ?? []
    );
  }, [list, listId]);

  return {
    list,
    errorExercises,
    isLoadingExercises,
    exerciseIdsOfList,
    refetchExercises,
  };
};
