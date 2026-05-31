import { useParams } from "react-router-dom";
import { useFetchClassroomUsers } from "../../hooks/useFetchClassroomUsers";
import { useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const { loggedUser } = useLoggedUser();
  const {
    refetchClassroomUsers,
    classroomUsersRecords: classroomUsers,
    isFetchingClassroomUsers: isFetchingClassroomUsers,
    classroomUsersError,
  } = useFetchClassroomUsers(params?.classroomId!);

  const { cachedClassroom } = useGetCachedClassrom(params?.classroomId!);

  const canAddTeacher = useMemo(() => {
    return cachedClassroom?.myClassroomPermissions?.canManageTeachers;
  }, [cachedClassroom]);

  return {
    classroom: cachedClassroom,
    classroomUsers,
    isFetchingClassroomUsers,
    classroomUsersError,
    loggedUser,
    canAddTeacher,
    refetchClassroomUsers,
  };
};
