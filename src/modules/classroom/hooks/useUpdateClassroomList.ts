import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { ICreateClassroomListBody } from "./useCreateClassroomList";

export type IUpdateClassroomListBody = Partial<ICreateClassroomListBody> & {
  listId?: number;
};

/**
 * Mutation para atualização de uma lista em uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateClassroomList = () => {
  const { apiBase } = useAxios();

  const { mutate: updateClassroomList, isPending: isUpdatingClassroomList } =
    useMutation({
      mutationFn: ({
        classroomId,
        listId,
        ...body
      }: IUpdateClassroomListBody) =>
        apiBase.put(`/classroom/${classroomId}/list/${listId}`, body),
      retry: 0,
    });

  return {
    updateClassroomList,
    isUpdatingClassroomList,
  };
};
