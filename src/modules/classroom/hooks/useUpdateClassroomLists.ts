import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface IUpdateListItem {
  id: number;
  status: number;
  startDate?: string | null;
  endDate?: string | null;
}

export interface IUpdateClassroomListsBody {
  classroomId: string;
  lists: IUpdateListItem[];
}

/**
 * Mutation para atualização em lote das listas de uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateClassroomLists = () => {
  const { apiBase } = useAxios();

  const { mutate: updateClassroomLists, isPending: isUpdatingClassroomLists } =
    useMutation({
      mutationFn: ({ classroomId, lists }: IUpdateClassroomListsBody) =>
        apiBase.put(`/classroom/${classroomId}/lists`, lists),
      retry: 0,
    });

  return {
    updateClassroomLists,
    isUpdatingClassroomLists,
  };
};
