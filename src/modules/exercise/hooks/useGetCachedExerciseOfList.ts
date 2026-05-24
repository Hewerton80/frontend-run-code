import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";
import { useQuery } from "@tanstack/react-query";
import { IExercise } from "../exerciseTypes";

export const useGetCachedExerciseOfList = (
  exerciseId: string,
  listId: string,
) => {
  const { data: exerciseOfList } = useQuery({
    enabled: !!exerciseId && !!listId,
    queryKey: listOfExercisesQueryKeyFactory.exerciseOfList(exerciseId, listId),
    queryFn: () => null,
    gcTime: Infinity,
    staleTime: Infinity,
  });
  return { exerciseOfList: exerciseOfList! as IExercise };
};
