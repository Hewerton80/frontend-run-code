import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "../classroomType";

type CreateTeacher = TeacherPermissions & {
  id: number;
};
export interface CreateClassroomBody {
  name: string;
  languages: string[];
  status: number;
  teachers: CreateTeacher[];
}
export const useCreateClassroom = () => {
  const { apiBase } = useAxios();

  const { isPending: isCreatingClassroom, mutateAsync: createClassroom } =
    useMutation({
      mutationFn: (createClassroomBody: CreateClassroomBody) =>
        apiBase.post("/classroom", createClassroomBody),
    });

  return {
    isCreatingClassroom,
    createClassroom,
  };
};
