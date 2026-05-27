import { useQuery } from "@tanstack/react-query";
import { listOfExercisesQueryKeyFactory } from "../utils/listOfExercisesQueryKeyFactory";
import { IList } from "../listTypes";

export const useGetCachedListOfClassroom = (listId: number) => {
  const { data: listOfClassroom } = useQuery<IList | null>({
    queryKey: listOfExercisesQueryKeyFactory.ofClassroom(listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!listId,
  });

  return { cachedListOfClassroom: listOfClassroom as IList };
};
