import { usePagination } from "@/hooks/usePagination";
import {
  IGetExercisesParams,
  useFetchExercises,
} from "@/modules/exercise/hooks/useFetchExercises";

export const useExercissesTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const usersParams: IGetExercisesParams = {
    ...paginationParams,
  };
  const { isExercisesLoading, exercises, exercisesError, refetchExercises } =
    useFetchExercises(usersParams);

  return {
    isExercisesLoading,
    exercises,
    exercisesError,
    goToPage,
    refetchExercises,
  };
};
