import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ClassroomKeys } from "../classroomType";
import { IPaginatedDocs } from "@/types/paginad";
import { IUser } from "@/modules/user/userTypets";

export const useGetClassroomUsers = (classroomId: string) => {
  const { apiBase } = useAxios();
  const {
    data: classroomUsers,
    isFetching: isLoadingClassroomUsers,
    error: classroomUsersError,
    refetch: refetchClassroomUsers,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IUser>>(`/classroom/${classroomId}/users`)
        .then((res) => res.data || { data: [] }),
    queryKey: [ClassroomKeys.Users, classroomId],
    enabled: true,
  });

  return {
    refetchClassroomUsers,
    classroomUsers,
    isLoadingClassroomUsers,
    classroomUsersError,
  };
};
