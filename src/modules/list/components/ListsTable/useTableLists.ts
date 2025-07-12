import { usePagination } from "@/hooks/usePagination";
import { IGetListExercisesParams, useGetLists } from "../../hooks/useGetLists";

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
  } = useGetLists(listsParams);

  return {
    isListExercisesLoading,
    listExercises,
    listExercisesError,
    goToPage,
    refetchListExercises,
  };
};
