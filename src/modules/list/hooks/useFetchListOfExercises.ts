import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";
import { exerciseQueryKeyFactory } from "@/modules/exercise/utils/exerciseQueryKeyFactory";
import { SubmissionStatus } from "@/modules/submission/types/SubmissionStatusEnum";

export interface ExerciseOfListDto {
  submissionStatus: SubmissionStatus | null;
  uuid: string;
  id: number;
  title: string;
  status: number;
  createdAt: string;
  author: {
    uuid: string;
    name: string;
    surname: string;
    email: string;
    avatarUrl: string | null;
    avatarBgColor: string;
  };
  difficulty: number | null;
  category: {
    uuid: string;
    name: string;
  } | null;
}
export interface FetchListOfExercisesByListIdResponse {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  status: number;
  exercises: ExerciseOfListDto[];
}

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
      const { data } = await apiBase.get<FetchListOfExercisesByListIdResponse>(
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
    list,
    errorExercises,
    isFetchingExercises,
    exerciseIdsOfList,
    refetchListOfExercises,
  };
};
