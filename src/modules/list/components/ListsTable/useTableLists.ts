import { usePagination } from "@/hooks/usePagination";
import {
  IGetListExercisesParams,
  useFetchLists,
} from "../../hooks/useFetchLists";

export const useTableLists = () => {
  const { goToPage, paginationParams } = usePagination();
  const listsParams: IGetListExercisesParams = {
    ...paginationParams,
  };
  const {
    refetchListExercises,
    listExercises,
    isListExercisesLoading,
    listExercisesError,
  } = useFetchLists(listsParams);

  return {
    isListExercisesLoading,
    listExercises,
    listExercisesError,
    goToPage,
    refetchListExercises,
  };
};
