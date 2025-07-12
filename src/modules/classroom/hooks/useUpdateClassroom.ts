import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { CreateClassroomBody } from "./useCreateClassroom";

export interface UpdateClassroomBody extends Partial<CreateClassroomBody> {}

export const useUpdateClassroom = (classroomId: string) => {
  const { apiBase } = useAxios();

  const { isPending: isUpdatingClassroom, mutateAsync: updateClassroom } =
    useMutation({
      mutationFn: (updateClassroomBody: UpdateClassroomBody) =>
        apiBase.put(`/classroom/${classroomId}`, updateClassroomBody),
    });

  return {
    isUpdatingClassroom,
    updateClassroom,
  };
};
