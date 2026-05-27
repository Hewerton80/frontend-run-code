import { useParams } from "react-router-dom";
import { useFetchClassroomUsers } from "../../hooks/useFetchClassroomUsers";
import { useCallback, useMemo, useState } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useGetCachedClassrom } from "../../hooks/useGetCachedClassrom";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const { loggedUser } = useLoggedUser();
  const {
    refetchClassroomUsers,
    classroomUsersRecords: classroomUsers,
    isFetchingClassroomUsers: isLoadingClassroomUsers,
    classroomUsersError,
  } = useFetchClassroomUsers(params?.classroomId!);

  const { cachedClassroom } = useGetCachedClassrom(params?.classroomId!);

  const [isOpenTeacherFormDialog, setIsOpenTeacherFormDialog] = useState(false);
  const [teacherIdToEdit, setTeacherIdToEdit] = useState<string | null>(null);

  const canAddTeacher = useMemo(() => {
    return cachedClassroom?.myClassroomPermissions?.canManageTeachers;
  }, [cachedClassroom]);

  const openTeacherFormDialog = useCallback(() => {
    setIsOpenTeacherFormDialog(true);
  }, []);

  const closeTeacherFormDialog = useCallback(() => {
    setIsOpenTeacherFormDialog(false);
    setTeacherIdToEdit(null);
  }, []);

  const handleSetTeacherIdToEdit = useCallback(
    (teacherId: string) => {
      setTeacherIdToEdit(teacherId);
      openTeacherFormDialog();
    },
    [openTeacherFormDialog],
  );

  return {
    classroom: cachedClassroom,
    classroomUsers,
    isLoadingClassroomUsers,
    classroomUsersError,
    isOpenTeacherFormDialog,
    teacherIdToEdit,
    loggedUser,
    canAddTeacher,
    handleSetTeacherIdToEdit,
    openTeacherFormDialog,
    closeTeacherFormDialog,
    refetchClassroomUsers,
  };
};
