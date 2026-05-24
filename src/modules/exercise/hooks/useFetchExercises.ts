import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../exerciseTypes";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";

export type IGetExercisesParams = IPaginationParams;

export const useFetchExercises = (exercisesParams?: IGetExercisesParams) => {
  const { apiBase } = useAxios();
  const {
    data: exercises,
    isFetching: isExercisesLoading,
    error: exercisesError,
    refetch: refetchExercises,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IExercise>>("/exercise", {
          params: removeEmptyKeys(exercisesParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [ExerciseQueryKey.EXERCISES, removeEmptyKeys(exercisesParams)],
    enabled: true,
  });
  return {
    refetchExercises,
    exercises,
    isExercisesLoading,
    exercisesError,
  };
};
