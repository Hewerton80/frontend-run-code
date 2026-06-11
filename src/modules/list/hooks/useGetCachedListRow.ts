import { useQuery } from "@tanstack/react-query";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";
import { IList } from "../listTypes";

export const useGetCachedListRow = (listId: number) => {
  const { data: cachedList } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.listRow(listId),
    queryFn: () => null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!listId,
  });

  return { cachedList: cachedList! as IList };
};
