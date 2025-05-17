import { useAxios } from "@/hooks/useAxios";
import { TeacherPermissions } from "@/modules/user/userTypets";
import { useMutation } from "@tanstack/react-query";

export type UpdateTeacherInClassroomBody = Partial<TeacherPermissions>;

export const useUpdateTeacherInClassroom = (
  classroomId: string,
  teacherId: string
) => {
  const { apiBase } = useAxios();
  const {
    mutate: updateTeacherInClassroom,
    isPending: isUpdatingTeacherInClassroom,
  } = useMutation({
    mutationFn: (updateTeacherInClassroomBody: UpdateTeacherInClassroomBody) =>
      apiBase.put(
        `/classroom/${classroomId}/teacher/${teacherId}`,
        updateTeacherInClassroomBody
      ),
  });

  return {
    updateTeacherInClassroom,
    isUpdatingTeacherInClassroom,
  };
};
