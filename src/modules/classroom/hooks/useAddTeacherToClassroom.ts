import { useAxios } from "@/hooks/useAxios";
import { TeacherPermissions } from "@/modules/user/userTypets";
import { useMutation } from "@tanstack/react-query";

export interface AddTeacherToClassroomBody extends TeacherPermissions {
  id: string;
}

export const useAddTeacherToClassroom = (classroomId: string) => {
  const { apiBase } = useAxios();
  const {
    mutate: addTeacherToClassroom,
    isPending: isAddingTeacherToClassroom,
  } = useMutation({
    mutationFn: (addTeacherToClassroomBody: AddTeacherToClassroomBody) =>
      apiBase.post(
        `/classroom/${classroomId}/teacher`,
        addTeacherToClassroomBody
      ),
  });

  return {
    addTeacherToClassroom,
    isAddingTeacherToClassroom,
  };
};
