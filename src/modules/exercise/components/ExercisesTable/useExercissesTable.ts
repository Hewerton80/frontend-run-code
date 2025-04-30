import { usePagination } from "@/hooks/usePagination";
import {
  IGetExercisesParams,
  useGetExercises,
} from "@/modules/exercise/hooks/useGetExercises";

export const useExercissesTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const usersParams: IGetExercisesParams = {
    ...paginationParams,
  };
  const { isExercisesLoading, exercises, exercisesError, refetchExercises } =
    useGetExercises(usersParams);

  return {
    isExercisesLoading,
    exercises,
    exercisesError,
    goToPage,
    refetchExercises,
  };
};
