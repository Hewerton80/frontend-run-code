import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IExercise, ExerciseQueryKey } from "../../exercise/exerciseTypes";
import { dalay } from "@/utils/dalay";
import { IList } from "@/modules/list/listTypes";
import { useMemo } from "react";

interface GetExercisesByClassroomListResponse {
  exercises: IExercise[];
  list: IList;
}

export const useGetList = ({
  classroomId,
  listId,
}: {
  classroomId: string;
  listId: string;
}) => {
  const { apiBase } = useAxios();
  const {
    data: list,
    error: errorExercises,
    isLoading: isLoadingExercises,
    refetch: refetchExercises,
  } = useQuery({
    queryKey: [ExerciseQueryKey.PROBLEMS_BY_CLASSROOM, classroomId, listId],
    queryFn: async () => {
      const { data } = await apiBase.get<IList>(
        `/list/${listId}/classroom/${classroomId}`
      );
      return data;
    },
  });

  // const exercises = useMemo(() => {
  //   return data?.exercises;
  // }, [data?.exercises]);

  // const list = useMemo(() => {
  //   return data?.list;
  // }, [data?.list]);

  return {
    list,
    errorExercises,
    isLoadingExercises,
    refetchExercises,
  };
};
