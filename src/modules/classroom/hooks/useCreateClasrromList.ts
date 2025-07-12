import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

export interface ICreateClassroomListBody {
  title: string;
  classroomId: string;
  startDate: string | null;
  endDate: string | null;
  status: number;
}

export const useCreateClasrromList = () => {
  const { apiBase } = useAxios();

  const { mutate: createClassroomList, isPending: isCraetingClassroomList } =
    useMutation({
      mutationFn: ({
        classroomId,
        ...createClassroomListBody
      }: ICreateClassroomListBody) =>
        apiBase.post(`/classroom/${classroomId}/list`, createClassroomListBody),
    });

  return {
    createClassroomList,
    isCraetingClassroomList,
  };
};
