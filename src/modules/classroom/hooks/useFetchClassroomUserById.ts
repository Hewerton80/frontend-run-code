import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { ITeacher } from "@/modules/user/userTypets";

export const useFetchClassroomUserById = (
  classroomId: string,
  userUuid?: string | null,
) => {
  const { apiBase } = useAxios();

  const {
    data: classroomUser,
    isFetching: isFetchingClassroomUser,
    error: classroomUserError,
    refetch: refetchClassroomUser,
  } = useQuery({
    queryKey: userUuid ? classroomQueryKeyFactory.userDetail(userUuid) : [],
    queryFn: ({ signal }) =>
      apiBase
        .get<ITeacher>(`/classroom/${classroomId}/users/${userUuid}`, {
          signal,
        })
        .then((res) => res.data),

    enabled: !!userUuid,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  return {
    classroomUser,
    isFetchingClassroomUser,
    classroomUserError,
    refetchClassroomUser,
  };
};
