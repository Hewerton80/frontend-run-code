import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { ExerciseOfListDto } from "@/modules/list/hooks/useFetchListOfExercises";

export const useGetCachedExerciseOfList = (
  exerciseUuId: string,
  listId: number,
) => {
  const { data: exerciseOfList } = useQuery<ExerciseOfListDto | null>({
    queryKey: exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseUuId && !!listId,
  });

  return { exerciseOfList: exerciseOfList as ExerciseOfListDto };
};
