import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../exerciseTypes";
import { dalay } from "@/utils/dalay";
import { IList } from "@/modules/list/listTypes";
import { useMemo } from "react";

interface GetExercisesByClassroomListResponse {
  exercises: IExercise[];
  list: IList;
}

export const useGetExercisesByClassroomList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();
  const {
    data,
    error: errorExercises,
    isLoading: isLoadingExercises,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: [ExerciseQueryKey.PROBLEMS_BY_CLASSROOM, classroomId, listId],
    queryFn: async () => {
      const {
        data: { exercises, list },
      } = await apiBase.get<GetExercisesByClassroomListResponse>(
        `/exercise/classroom/${classroomId}/list/${listId}`
      );
      return {
        list,
        exercises: exercises || [],
      } as GetExercisesByClassroomListResponse;
    },
  });

  const exercises = useMemo(() => {
    return data?.exercises;
  }, [data?.exercises]);

  const list = useMemo(() => {
    return data?.list;
  }, [data?.list]);

  return {
    list,
    exercises,
    errorExercises,
    isLoadingExercises,
    refetchExercises,
  };
};
