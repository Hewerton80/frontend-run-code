import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

export interface ICreateClassroomListBody {
  title: string;
  classroomId: string;
  startDate: string | null;
  endDate: string | null;
  status: number;
}

/**
 * Mutation para criação de uma lista em uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useCreateClassroomList = () => {
  const { apiBase } = useAxios();

  const { mutate: createClassroomList, isPending: isCreatingClassroomList } =
    useMutation({
      mutationFn: ({ classroomId, ...body }: ICreateClassroomListBody) =>
        apiBase
          .post<{ id: number }>(`/classroom/${classroomId}/list`, body)
          .then((res) => res.data),
      retry: 0,
    });

  return {
    createClassroomList,
    isCreatingClassroomList,
  };
};
