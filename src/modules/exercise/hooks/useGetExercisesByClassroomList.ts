import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../exerciseTypes";
import { dalay } from "@/utils/dalay";

export const useGetExercisesByClassroomList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();
  const {
    data: exercises,
    error: errorExercises,
    isLoading: isLoadingExercises,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: [ExerciseQueryKey.PROBLEMS_BY_CLASSROOM, classroomId, listId],
    queryFn: async () => {
      const { data } = await apiBase.get<IExercise[]>(
        `/exercise/classroom/${classroomId}/list/${listId}`
      );
      return data || ([] as IExercise[]);
    },
  });

  return {
    exercises,
    errorExercises,
    isLoadingExercises,
    refetchExercises,
  };
};
