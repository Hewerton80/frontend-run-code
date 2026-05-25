import { useAxios } from "@/hooks/useAxios";
import { TeacherPermissions } from "@/modules/user/userTypets";
import { useMutation } from "@tanstack/react-query";

export interface IAddTeacherToClassroomBody extends TeacherPermissions {
  id: string;
}

/**
 * Mutation para adicionar um professor a uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useAddTeacherToClassroom = (classroomId: string) => {
  const { apiBase } = useAxios();

  const {
    mutate: addTeacherToClassroom,
    isPending: isAddingTeacherToClassroom,
  } = useMutation({
    mutationFn: (body: IAddTeacherToClassroomBody) =>
      apiBase.post(`/classroom/${classroomId}/teacher`, body),
    retry: 0,
  });

  return {
    addTeacherToClassroom,
    isAddingTeacherToClassroom,
  };
};
