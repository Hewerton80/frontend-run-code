import { useParams } from "react-router-dom";
import { useGetClassroomUsers } from "../../hooks/useGetClassroomUsers";
import { useFetchClassroomById } from "../../hooks/useFetchClassroomById";
import { useCallback, useMemo, useState } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const { loggedUser } = useLoggedUser();
  const {
    refetchClassroomUsers,
    classroomUsers,
    isLoadingClassroomUsers,
    classroomUsersError,
  } = useGetClassroomUsers(params?.classroomId);

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useFetchClassroomById(params?.classroomId);

  const [isOpenTeacherFormDialog, setIsOpenTeacherFormDialog] = useState(false);
  const [teacherIdToEdit, setTeacherIdToEdit] = useState<string | null>(null);

  const canAddTeacher = useMemo(() => {
    return classroom?.myClassroomPermissions?.canManageTeachers;
  }, [classroom]);

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
    classroom,
    errorClassroom,
    isLoadingClassroom,
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
    refetchClassroom,
    refetchClassroomUsers,
  };
};
