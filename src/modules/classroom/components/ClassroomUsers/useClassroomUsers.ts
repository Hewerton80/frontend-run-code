import { useParams } from "react-router-dom";
import {
  CLASSROOM_USER_PER_PAGE,
  useFetchClassroomUsers,
} from "../../hooks/useFetchClassroomUsers";
import { useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";
import { usePagination } from "@/hooks/usePagination";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const { loggedUser } = useLoggedUser();
  const { goToPage, paginationParams } = usePagination({
    initialParams: { perPage: CLASSROOM_USER_PER_PAGE },
  });

  const {
    refetchClassroomUsers,
    classroomUsersRecords: classroomUsers,
    isFetchingClassroomUsers: isFetchingClassroomUsers,
    classroomUsersError,
  } = useFetchClassroomUsers(params?.classroomId!, paginationParams);

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
    paginationParams,
    goToPage,
    refetchClassroomUsers,
  };
};
