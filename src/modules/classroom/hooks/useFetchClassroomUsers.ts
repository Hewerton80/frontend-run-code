import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { IPaginatedDocs } from "@/types/paginad";
import { IUser } from "@/modules/user/userTypets";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export const useFetchClassroomUsers = (classroomId: string) => {
  const { apiBase } = useAxios();

  const {
    data: classroomUsersRecords,
    isFetching: isFetchingClassroomUsers,
    error: classroomUsersError,
    refetch: refetchClassroomUsers,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.users(classroomId),
    queryFn: async ({ signal }) => {
      const { data: response } = await apiBase.get<IPaginatedDocs<IUser>>(
        `/classroom/${classroomId}/users`,
        { signal },
      );

      response?.data?.forEach((user) => {
        if (user.uuid) {
          setItemInCache<IUser>(classroomQueryKeyFactory.row(user.uuid), user);
        }
      });

      return (
        response ?? { data: [], total: 0, limit: 10, page: 1, totalPages: 0 }
      );
    },
    enabled: !!classroomId,
    retry: 0,
  });

  return {
    classroomUsersRecords,
    isFetchingClassroomUsers,
    classroomUsersError,
    refetchClassroomUsers,
  };
};
