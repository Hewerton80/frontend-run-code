import { useParams } from "next/navigation";
import { useGetClassroomUsers } from "../../hooks/useGetClassroomUsers";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";
import { useCallback, useState } from "react";

export const useClassroomUsers = () => {
  const params = useParams<{ classroomId: string }>();
  const {
    refetchClassroomUsers,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
  } = useGetClassroomUsers(params?.classroomId);

  const { classroom, errorClassroom, isLoadingClassroom, refetchClassroom } =
    useGetClassroomById(params?.classroomId);

  const [isOpenTeacherFormDialog, setIsOpenTeacherFormDialog] = useState(false);

  const openTeacherFormDialog = useCallback(() => {
    setIsOpenTeacherFormDialog(true);
  }, []);

  const closeTeacherFormDialog = useCallback(() => {
    setIsOpenTeacherFormDialog(false);
  }, []);

  return {
    classroom,
    errorClassroom,
    isLoadingClassroom,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
    isOpenTeacherFormDialog,
    openTeacherFormDialog,
    closeTeacherFormDialog,
    refetchClassroom,
    refetchClassroomUsers,
  };
};
