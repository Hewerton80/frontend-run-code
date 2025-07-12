import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "../classroomType";

type UpdateClasrromTeacher = TeacherPermissions & {
  id: number;
};
export interface UpdateClasrromTeachersBody {
  teachers?: UpdateClasrromTeacher[];
}
export const useUpdateClasrromTeachers = (classroomId: string) => {
  const { apiBase } = useAxios();

  const {
    isPending: isUpdatingClasrromTeachers,
    mutateAsync: updateClasrromTeachers,
  } = useMutation({
    mutationFn: (updateClasrromTeachers: UpdateClasrromTeachersBody) =>
      apiBase.post("/classroom", updateClasrromTeachers),
  });

  return {
    isUpdatingClasrromTeachers,
    updateClasrromTeachers,
  };
};
