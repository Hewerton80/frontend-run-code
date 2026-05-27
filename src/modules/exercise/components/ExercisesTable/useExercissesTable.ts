import { usePagination } from "@/hooks/usePagination";
import {
  IFetchExercisesParams,
  useFetchExercises,
} from "@/modules/exercise/hooks/useFetchExercises";

export const useExercissesTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const usersParams: IFetchExercisesParams = {
    ...paginationParams,
  };
  const {
    isFetchingExercises,
    exercisesRecords,
    exercisesError,
    refetchExercises,
  } = useFetchExercises(usersParams);

  return {
    isFetchingExercises,
    exercises: exercisesRecords,
    exercisesError,
    goToPage,
    refetchExercises,
  };
};
