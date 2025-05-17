import { useParams } from "next/navigation";
import { useGetClassroomUsers } from "../../hooks/useGetClassroomUsers";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useCallback, useMemo, useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const { loggedUser } = useAuth();
  const {
    refetchClassroomUsers,
    classroomUsers,
    isLoadingClassroomUsers,
    classroomUsersError,
  } = useGetClassroomUsers(params?.classroomId);

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

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
    [openTeacherFormDialog]
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
