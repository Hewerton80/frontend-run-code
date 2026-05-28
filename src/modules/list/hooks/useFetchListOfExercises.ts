import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { IList } from "@/modules/list/listTypes";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";

export const useFetchListOfExercises = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: number;
}) => {
  const { apiBase } = useAxios();

  const {
    data: list,
    error: errorExercises,
    isFetching: isFetchingExercises,
    refetch: refetchListOfExercises,
  } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.withExercises(listId),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<IList>(
        `/list/${listId}/classroom/${classroomId}`,
        { signal },
      );
      data.exercises.forEach((exercise) => {
        setItemInCache(
          exerciseQueryKeyFactory.ofList(exercise?.uuid!, listId),
          exercise,
        );
      });
      return data;
    },
    enabled: !!classroomId && !!listId,
    retry: 0,
  });

  const exerciseIdsOfList = useMemo(
    () => list?.exercises?.map((exercise) => exercise.uuid) ?? [],
    [list],
  );

  return {
    errorExercises,
    isFetchingExercises,
    exerciseIdsOfList,
    refetchListOfExercises,
  };
};
