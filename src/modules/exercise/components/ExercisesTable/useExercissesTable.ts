import { usePagination } from "@/hooks/usePagination";
import {
  IFetchExercisesParams,
  useFetchExercises,
} from "@/modules/exercise/hooks/useFetchExercises";
import { useMemo } from "react";
import { PaginationBarProps } from "@/components/ui/navigation/PaginationBar";

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

  const exerciseUuids = useMemo(
    () => exercisesRecords?.data?.map((e) => e.uuid ?? "") ?? [],
    [exercisesRecords],
  );

  const pagination = useMemo<PaginationBarProps | null>(() => {
    if (!exercisesRecords) return null;
    return {
      currentPage: exercisesRecords.currentPage ?? 1,
      totalPages: exercisesRecords.lastPage ?? 1,
      perPage: exercisesRecords.perPage ?? 25,
      totalRecords: exercisesRecords.total ?? 0,
      onChangePage: goToPage,
    };
  }, [exercisesRecords, goToPage]);

  return {
    isFetchingExercises,
    exerciseUuids,
    pagination,
    exercisesError,
    refetchExercises,
  };
};
