import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "@/modules/exercise/exerciseTypes";

export const useGetCachedExerciseOfList = (
  exerciseUuId: string,
  listId: number,
) => {
  const { data: exerciseOfList } = useQuery<IExercise | null>({
    queryKey: exerciseQueryKeyFactory.ofList(exerciseUuId, listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseUuId && !!listId,
  });

  return { exerciseOfList: exerciseOfList as IExercise };
};
