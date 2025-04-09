import { useParams } from "next/navigation";
import { useGetClassroomUsers } from "../../hooks/useGetClassroomUsers";
import { useGetClassroomById } from "../../hooks/useGetClassroomById";

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

  return {
    classroom,
    errorClassroom,
    isLoadingClassroom,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
    refetchClassroom,
    refetchClassroomUsers,
  };
};
