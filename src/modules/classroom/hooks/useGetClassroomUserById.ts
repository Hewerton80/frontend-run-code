import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ClassroomKeys } from "../classroomType";
import { ITeacher, IUser } from "@/modules/user/userTypets";

export const useGetClassroomUserById = (
  classroomId: string,
  userUuId?: string | null
) => {
  const { apiBase } = useAxios();
  const {
    data: classroomUser,
    isFetching: isLoadingClassroomUser,
    error: classroomUserError,
    refetch: refetchClassroomUser,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<ITeacher>(`/classroom/${classroomId}/users/${userUuId}`)
        .then((res) => res.data),
    queryKey: [ClassroomKeys.User, classroomId, userUuId],
    enabled: !!userUuId,
  });

  return {
    refetchClassroomUser,
    classroomUser,
    isLoadingClassroomUser,
    classroomUserError,
  };
};
