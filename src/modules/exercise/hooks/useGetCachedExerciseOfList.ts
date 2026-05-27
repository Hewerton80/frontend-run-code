import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "@/modules/exercise/exerciseTypes";

export const useGetCachedExerciseOfList = (
  exerciseId: string,
  listId: number,
) => {
  const { data: exerciseOfList } = useQuery<IExercise | null>({
    queryKey: exerciseQueryKeyFactory.ofList(exerciseId, listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!exerciseId && !!listId,
  });

  return { exerciseOfList: exerciseOfList as IExercise };
};
