import { useQuery } from "@tanstack/react-query";
import { exerciseQueryKeyFactory } from "../utils/exerciseQueryKeyFactory";
import { IExercise } from "../exerciseTypes";

export const useGetCachedExerciseRow = (exerciseUuid: string) => {
  const { data: cachedExercise } = useQuery<IExercise | null>({
    queryKey: exerciseQueryKeyFactory.row(exerciseUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseUuid,
  });

  return { cachedExercise: cachedExercise as IExercise };
};
