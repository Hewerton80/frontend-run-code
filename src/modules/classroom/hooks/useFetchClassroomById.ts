import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";

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
      return data;
    },

    enabled: !!classroomId,
    staleTime: Infinity,
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
