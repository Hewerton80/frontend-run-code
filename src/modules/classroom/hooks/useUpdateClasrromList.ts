import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { ICreateClassroomListBody } from "./useCreateClasrromList";

export interface IUpdateClassroomListBody
  extends Partial<ICreateClassroomListBody> {
  listId?: number;
}

export const useUpdateClasrromList = () => {
  const { apiBase } = useAxios();

  const { mutate: updateClassroomList, isPending: isUpdatingClassroomList } =
    useMutation({
      mutationFn: ({
        classroomId,
        listId,
        ...updateClassroomListBody
      }: IUpdateClassroomListBody) =>
        apiBase.put(
          `/classroom/${classroomId}/list/${listId}`,
          updateClassroomListBody
        ),
    });

  return {
    updateClassroomList,
    isUpdatingClassroomList,
  };
};
