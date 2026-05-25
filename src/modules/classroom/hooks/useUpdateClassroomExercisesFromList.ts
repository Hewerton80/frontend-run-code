import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface IExerciseIdBody {
  id: number;
}

/**
 * Mutation para atualizar os exercícios de uma lista em uma turma.
 * A invalidação/atualização de cache é responsabilidade do `onSuccess` no componente.
 */
export const useUpdateClassroomExercisesFromList = (
  classroomId: string,
  listId: number,
) => {
  const { apiBase } = useAxios();

  const {
    mutate: updateClassroomExercisesFromList,
    isPending: isUpdatingClassroomExercisesFromList,
  } = useMutation({
    mutationFn: (exercises: IExerciseIdBody[]) =>
      apiBase.put(
        `/classroom/${classroomId}/list/${listId}/exercises`,
        exercises,
      ),
    retry: 0,
  });

  return {
    updateClassroomExercisesFromList,
    isUpdatingClassroomExercisesFromList,
  };
};
