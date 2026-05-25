import { useAxios } from "@/hooks/useAxios";
import { TeacherPermissions } from "@/modules/user/userTypets";
import { useMutation } from "@tanstack/react-query";

export type IUpdateTeacherInClassroomBody = Partial<TeacherPermissions>;

/**
 * Mutation para atualizar as permissões de um professor em uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateTeacherInClassroom = (
  classroomId: string,
  teacherId: string,
) => {
  const { apiBase } = useAxios();

  const {
    mutate: updateTeacherInClassroom,
    isPending: isUpdatingTeacherInClassroom,
  } = useMutation({
    mutationFn: (body: IUpdateTeacherInClassroomBody) =>
      apiBase.put(`/classroom/${classroomId}/teacher/${teacherId}`, body),
    retry: 0,
  });

  return {
    updateTeacherInClassroom,
    isUpdatingTeacherInClassroom,
  };
};
