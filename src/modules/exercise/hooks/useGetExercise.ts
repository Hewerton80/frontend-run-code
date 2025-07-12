import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../exerciseTypes";

interface ExerciseParams {
  exerciseId: string;
  classroomId?: string;
  listId?: string;
}

export const useGetExercise = ({
  exerciseId,
  classroomId,
  listId,
}: ExerciseParams) => {
  const { apiBase } = useAxios();

  const {
    data: exercise,
    isFetching: isLoadingExercise,
    error: exerciseError,
    refetch: refetchExercise,
  } = useQuery({
    queryKey: [ExerciseQueryKey.PROBLEM, exerciseId, classroomId, listId],
    queryFn: async () => {
      let url = `/exercise/${exerciseId}`;
      if (classroomId && listId) {
        url += `/classroom/${classroomId}/list/${listId}`;
      }
      return apiBase.get<IExercise>(url).then((res) => res.data);
    },
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return {
    exercise,
    isLoadingExercise,
    exerciseError,
    refetchExercise,
  };
};
