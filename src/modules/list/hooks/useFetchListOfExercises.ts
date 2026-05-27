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
    refetch: refetchExercises,
  } = useQuery({
    queryKey: listOfExercisesQueryKeyFactory.withExercises(listId),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<IList>(
        `/list/${listId}/classroom/${classroomId}`,
        { signal },
      );
      return data;
    },
    retry: 0,
  });

  /** IDs dos exercícios da lista — semeia o cache individual de cada exercício */
  const exerciseIdsOfList = useMemo(() => {
    return (
      list?.exercises?.map((exercise) => {
        setItemInCache(
          exerciseQueryKeyFactory.ofList(exercise.uuid, listId),
          exercise,
        );

        return exercise.uuid!;
      }) ?? []
    );
  }, [list, listId]);

  return {
    list,
    errorExercises,
    isFetchingExercises,
    exerciseIdsOfList,
    refetchExercises,
  };
};
