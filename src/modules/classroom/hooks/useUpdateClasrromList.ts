import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

export interface IUpdateClassroomListBody {
  classroomId: string;
  listId: number;
  startDate: string | null;
  endDate: string | null;
  status: number;
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
