import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "@/modules/exercise/exerciseTypes";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { getItemFromQueryCache } from "@/utils/tanstackQueryHelpers/getItemFromQueryCache";

interface IFetchExerciseParams {
  exerciseId: string;
  classroomId?: string;
  listId?: string;
}

/**
 * Busca o detalhe de um exercício por ID.
 * Aplica cache-first: exibe o dado do cache instantaneamente enquanto refetch ocorre em background.
 * Suporta contexto opcional de turma/lista para buscar exercício dentro de uma lista.
 * Suporta cancelamento automático via AbortSignal.
 * Não executa sem `exerciseId`.
 */
export const useFetchExercise = ({
  exerciseId,
  classroomId,
  listId,
}: IFetchExerciseParams) => {
  const { apiBase } = useAxios();

  const {
    data: exercise,
    isFetching: isFetchingExercise,
    error: exerciseError,
    refetch: refetchExercise,
  } = useQuery({
    queryKey: exerciseQueryKeyFactory.detail(exerciseId, classroomId, listId),
    queryFn: async ({ signal }) => {
      let url = `/exercise/${exerciseId}`;
      if (classroomId && listId) {
        url += `/classroom/${classroomId}/list/${listId}`;
      }
      return apiBase.get<IExercise>(url, { signal }).then((res) => res.data);
    },
    initialData: () =>
      getItemFromQueryCache<IExercise>(
        exerciseQueryKeyFactory.detail(exerciseId, classroomId, listId),
      ),
    enabled: !!exerciseId,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  return {
    exercise,
    isFetchingExercise,
    exerciseError,
    refetchExercise,
  };
};
