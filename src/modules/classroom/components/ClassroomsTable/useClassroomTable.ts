import { usePagination } from "@/hooks/usePagination";
import {
  type IFetchClassroomsParams as IGetClassroomsParams,
  useFetchClassrooms,
} from "../../hooks/useFetchClassrooms";

export const useClassroomsTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const classroomsParams: IGetClassroomsParams = {
    ...paginationParams,
  };
  const {
    refetchClassrooms,
    classroomsRecords: classrooms,
    isFetchingClassrooms: isClassroomsLoading,
    classroomsError,
  } = useFetchClassrooms(classroomsParams);

  return {
    refetchClassrooms,
    classrooms,
    isClassroomsLoading,
    classroomsError,
    goToPage,
  };
};
