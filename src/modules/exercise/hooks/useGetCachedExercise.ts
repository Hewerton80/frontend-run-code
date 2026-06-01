import { useQuery } from "@tanstack/react-query";
import { exerciseQueryKeyFactory } from "../utils/exerciseQueryKeyFactory";
import { IExercise } from "../exerciseTypes";

/**
 * Lê um exercício diretamente do cache do TanStack Query.
 * Nunca dispara uma requisição HTTP — os dados são semeados por `useFetchExercises`.
 * Use em componentes de linha de lista para isolar re-renders por item.
 */
export const useGetCachedExercise = (exerciseUuid: string) => {
  const { data: cachedExercise } = useQuery<IExercise | null>({
    queryKey: exerciseQueryKeyFactory.detail(exerciseUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseUuid,
  });

  return { cachedExercise: cachedExercise as IExercise };
};
