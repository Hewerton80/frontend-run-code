import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

export interface CreateClassroomBody {
  name: string;
  languages: string[];
  status: number;
  teachers: {
    id: number;
    canEditClassroom: boolean;
    canManageTeachers: boolean;
    canCreateList: boolean;
    canEditList: boolean;
    canDeleteList: boolean;
    canManageExercises: boolean;
    canRemoveMember: boolean;
  }[];
}
export const useCreateClassroom = () => {
  const { apiBase } = useAxios();

  const { isPending: isCreatingClassroom, mutateAsync: createClassroom } =
    useMutation({
      mutationFn: (createClassroomBody: CreateClassroomBody) =>
        apiBase.post("/classroom", createClassroomBody),
    });

  return {
    isCreatingClassroom,
    createClassroom,
  };
};
