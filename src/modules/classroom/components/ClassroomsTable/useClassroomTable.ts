import { usePagination } from "@/hooks/usePagination";
import {
  IGetClassroomsParams,
  useGetClassrooms,
} from "../../hooks/useGetClassrooms";

export const useClassroomsTable = () => {
  const { goToPage, paginationParams } = usePagination();
  const classroomsParams: IGetClassroomsParams = {
    ...paginationParams,
  };
  const {
    refetchClassrooms,
    classrooms,
    isClassroomsLoading,
    classroomsError,
  } = useGetClassrooms(classroomsParams);

  return {
    refetchClassrooms,
    classrooms,
    isClassroomsLoading,
    classroomsError,
    goToPage,
  };
};
