import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IList } from "@/modules/list/listTypes";
import { useMemo } from "react";
import { listOfExercisesQueryKeyFactory } from "../utils/listOfExercisesQueryKeyFactory";

export const useFetchList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();
  const {
    data: list,
    error: errorExercises,
    isLoading: isLoadingExercises,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.list(listId, classroomId),

    queryFn: async () => {
      const { data } = await apiBase.get<IList>(
        `/list/${listId}/classroom/${classroomId}`,
      );
      return data;
    },
  });

  const exerciseIdsOfList = useMemo(() => {
    return (
      list?.exercises?.map((exercise) => {
        setItemInCache(
          listOfExercisesQueryKeyFactory.exerciseOfList(
            exercise?.uuid!,
            listId,
          ),
          exercise,
        );
        return exercise?.uuid!;
      }) || []
    );
  }, [list, listId]);

  return {
    errorExercises,
    isLoadingExercises,
    exerciseIdsOfList,
    refetchExercises,
  };
};
