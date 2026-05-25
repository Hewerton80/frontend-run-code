import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "@/modules/exercise/exerciseTypes";

/**
 * Lê um exercício de uma lista diretamente do cache (sem HTTP).
 * O dado é semeado previamente por `useFetchList` via `setItemInCache`.
 * Usado em componentes de linha que recebem apenas `exerciseId` e `listId` como props.
 */
export const useGetCachedExerciseOfList = (
  exerciseId: string,
  listId: string,
) => {
  const { data: exerciseOfList } = useQuery<IExercise | null>({
    queryKey: exerciseQueryKeyFactory.ofList(exerciseId, listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    // enabled deriva dos argumentos: só faz sentido quando ambos estão presentes
    enabled: !!exerciseId && !!listId,
  });

  return { exerciseOfList: exerciseOfList as IExercise };
};
