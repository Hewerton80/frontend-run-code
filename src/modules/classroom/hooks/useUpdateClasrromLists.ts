import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface IUpdateListsBody {
  id: number;
  status: number;
  startDate?: string | null;
  endDate?: string | null;
}
interface IUpdateClassroomListsBody {
  classroomId: string;
  lists: IUpdateListsBody[];
}

export const useUpdateClasrromLists = () => {
  const { apiBase } = useAxios();

  const { mutate: updateClassroomLists, isPending: isUpdatingClassroomLists } =
    useMutation({
      mutationFn: ({ classroomId, lists }: IUpdateClassroomListsBody) =>
        apiBase.put(`/classroom/${classroomId}/lists`, lists),
    });

  return {
    updateClassroomLists,
    isUpdatingClassroomLists,
  };
};
