import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { listOfExercisesQueryKeyFactory } from "./listOfExercisesQueryKeyFactory";

export const forceRefetchExercisesOfList = (listId: number) => {
  queryClient.invalidateQueries({
    queryKey: listOfExercisesQueryKeyFactory.withExercises(listId),
  });
};
