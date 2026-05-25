import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "@/modules/user/userTypets";

type UpdateClassroomTeacher = TeacherPermissions & {
  id: number;
};

/** Corpo da requisição de atualização de turma (todos os campos opcionais) */
export interface IUpdateClassroomBody {
  name?: string;
  languages?: string[];
  status?: number;
  teachers?: UpdateClassroomTeacher[];
}

/**
 * Mutation para atualização de uma turma existente.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateClassroom = (classroomId: string) => {
  const { apiBase } = useAxios();

  const { isPending: isUpdatingClassroom, mutateAsync: updateClassroom } =
    useMutation({
      mutationFn: (body: IUpdateClassroomBody) =>
        apiBase.put(`/classroom/${classroomId}`, body),
      retry: 0,
    });

  return {
    isUpdatingClassroom,
    updateClassroom,
  };
};
