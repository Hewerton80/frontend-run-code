import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { TeacherPermissions } from "@/modules/user/userTypets";

type CreateClassroomTeacher = TeacherPermissions & {
  id: number;
};

export interface ICreateClassroomBody {
  name: string;
  languages: string[];
  status: number;
  teachers?: CreateClassroomTeacher[];
}

/**
 * Mutation para criação de uma nova turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useCreateClassroom = () => {
  const { apiBase } = useAxios();

  const { isPending: isCreatingClassroom, mutateAsync: createClassroom } =
    useMutation({
      mutationFn: (body: ICreateClassroomBody) =>
        apiBase.post("/classroom", body),
      retry: 0,
    });

  return {
    isCreatingClassroom,
    createClassroom,
  };
};
