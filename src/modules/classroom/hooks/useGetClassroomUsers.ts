import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ClassroomKeys } from "../classroomType";
import { IPagined } from "@/types/paginad";
import { IUser } from "@/modules/user/userTypets";

export const useGetClassroomUsers = (classroomId: string) => {
  const { apiBase } = useAxios();
  const {
    data: classroomUsers,
    isFetching: isClassroomUsersLoading,
    error: classroomUsersError,
    refetch: refetchClassroomUsers,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPagined<IUser>>(`/classroom/${classroomId}/users`)
        .then((res) => res.data || { data: [] }),
    queryKey: [ClassroomKeys.Users],
    enabled: true,
  });

  return {
    refetchClassroomUsers,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
  };
};
