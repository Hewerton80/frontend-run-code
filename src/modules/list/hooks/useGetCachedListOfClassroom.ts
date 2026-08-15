import { useQuery } from "@tanstack/react-query";
import { listOfExercisesQueryKeyFactory } from "../utils/listOfExercisesQueryKeyFactory";
import { IFetchListsOfClassromResponse } from "./useFetchListsByClassromUuid";

export const useGetCachedListOfClassroom = (listId: number) => {
  const { data: listOfClassroom } =
    useQuery<IFetchListsOfClassromResponse | null>({
      queryKey: listOfExercisesQueryKeyFactory.oneOfClassroom(listId),
      queryFn: () => null,
      staleTime: Infinity,
      gcTime: Infinity,
      enabled: !!listId,
    });

  return {
    cachedListOfClassroom: listOfClassroom as IFetchListsOfClassromResponse,
  };
};
