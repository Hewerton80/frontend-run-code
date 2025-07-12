import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../exerciseTypes";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";

export interface IGetExercisesParams extends IPaginationParams {}

export const useGetExercises = (exercisesParams?: IGetExercisesParams) => {
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
    queryKey: [
      ExerciseQueryKey.PROBLEMS,
      ...Object.values(removeEmptyKeys(exercisesParams)),
    ],
    enabled: true,
  });
  return {
    refetchExercises,
    exercises,
    isExercisesLoading,
    exercisesError,
  };
};
