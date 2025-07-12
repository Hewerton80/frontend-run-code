import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface IUpdateExercisesFromListBody {
  id: number;
}

export const useUpdateClasrromExercisesFromList = (
  classroomId: string,
  listId: number
) => {
  const { apiBase } = useAxios();

  const {
    mutate: updateClasrromExercisesFromList,
    isPending: isUpdatingClasrromExercisesFromList,
  } = useMutation({
    mutationFn: (exercises: IUpdateExercisesFromListBody[]) =>
      apiBase.put(
        `/classroom/${classroomId}/list/${listId}/exercises`,
        exercises
      ),
  });

  return {
    updateClasrromExercisesFromList,
    isUpdatingClasrromExercisesFromList,
  };
};
