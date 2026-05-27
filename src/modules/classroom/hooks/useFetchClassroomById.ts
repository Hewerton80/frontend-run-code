import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { listOfExercisesQueryKeyFactory } from "@/modules/list/utils/listOfExercisesQueryKeyFactory";

export const useFetchClassroomById = (classroomId?: string) => {
  const { apiBase } = useAxios();

  const {
    data: classroom,
    isFetching: isFetchingClassroom,
    error: classroomError,
    refetch: refetchClassroom,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.detail(classroomId),
    queryFn: async ({ signal }) => {
      const { data } = await apiBase.get<IClassroom>(
        `/classroom/${classroomId}`,
        { signal },
      );
      data?.lists?.forEach((list) => {
        setItemInCache(listOfExercisesQueryKeyFactory.ofClassroom(list.id), {
          ...list,
          classroom: data,
        });
      });
      return data;
    },

    enabled: !!classroomId,
    staleTime: 60 * 1000 * 30, // 30 minutes
    gcTime: Infinity,
    retry: 0,
  });

  return {
    classroom,
    isFetchingClassroom,
    classroomError,
    refetchClassroom,
  };
};
