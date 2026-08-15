import { useQuery } from "@tanstack/react-query";
import { exerciseQueryKeyFactory } from "../utils/exerciseQueryKeyFactory";
import { FetchExercisesResponseData } from "./useFetchExercises";

export const useGetCachedExerciseRow = (exerciseUuid: string) => {
  const { data: cachedExercise } = useQuery<FetchExercisesResponseData | null>({
    queryKey: exerciseQueryKeyFactory.row(exerciseUuid),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseUuid,
  });

  return { cachedExercise: cachedExercise as FetchExercisesResponseData };
};
