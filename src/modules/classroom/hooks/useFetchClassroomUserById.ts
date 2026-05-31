import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { ITeacher } from "@/modules/user/userTypets";

export const useFetchClassroomUserById = (
  classroomId: string,
  userUuId?: string | null,
) => {
  const { apiBase } = useAxios();

  const {
    data: classroomUser,
    isFetching: isFetchingClassroomUser,
    error: classroomUserError,
    refetch: refetchClassroomUser,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.userDetail(classroomId, userUuId),
    queryFn: ({ signal }) =>
      apiBase
        .get<ITeacher>(`/classroom/${classroomId}/users/${userUuId}`, {
          signal,
        })
        .then((res) => res.data),

    enabled: !!userUuId,
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
