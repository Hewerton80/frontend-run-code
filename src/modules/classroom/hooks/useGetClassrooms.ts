import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { ClassroomKeys, IClassroom } from "../classroomType";

export interface IGetClassroomsParams extends IPaginationParams {}

export const useGetClassrooms = (classroomsParams?: IGetClassroomsParams) => {
  const { apiBase } = useAxios();
  const {
    data: classrooms,
    isFetching: isClassroomsLoading,
    error: classroomsError,
    refetch: refetchClassrooms,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IClassroom>>("/classroom", {
          params: removeEmptyKeys(classroomsParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [
      ClassroomKeys.PaginedClassrooms,
      ...Object.values(removeEmptyKeys(classroomsParams)),
    ],
    enabled: true,
  });

  return {
    refetchClassrooms,
    classrooms,
    isClassroomsLoading,
    classroomsError,
  };
};
