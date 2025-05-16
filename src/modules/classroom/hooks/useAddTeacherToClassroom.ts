import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "../classroomType";

export interface AddTeacherToClassroomBody extends TeacherPermissions {
  id: string;
}

export const useAddTeacherToClassroom = (classroomId: string) => {
  const { apiBase } = useAxios();
  const { mutate: addTeacherToClassroom, isPending: isAddingTeacherToClass } =
    useMutation({
      mutationFn: (addTeacherToClassroomBody: AddTeacherToClassroomBody) =>
        apiBase.post(
          `/classroom/${classroomId}/teacher`,
          addTeacherToClassroomBody
        ),
    });

  return {
    addTeacherToClassroom,
    isAddingTeacherToClass,
  };
};
