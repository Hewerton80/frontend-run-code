import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "@/modules/user/userTypets";

type UpdateClassroomTeacher = TeacherPermissions & {
  id: number;
};

export interface IUpdateClassroomTeachersBody {
  teachers?: UpdateClassroomTeacher[];
}

/**
 * Mutation para atualização em lote dos professores de uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateClassroomTeachers = (classroomId: string) => {
  const { apiBase } = useAxios();

  const {
    isPending: isUpdatingClassroomTeachers,
    mutateAsync: updateClassroomTeachers,
  } = useMutation({
    mutationFn: (body: IUpdateClassroomTeachersBody) =>
      apiBase.post(`/classroom/${classroomId}`, body),
    retry: 0,
  });

  return {
    isUpdatingClassroomTeachers,
    updateClassroomTeachers,
  };
};
