import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { ClassroomKeys, IClassroom } from "../classroomType";

export const useGetClassroomById = (classroomId: string) => {
  const { apiBase } = useAxios();

  const {
    data: classroom,
    isLoading: isLoadingClassroom,
    refetch: refetchClassroom,
    error: errorClassroom,
  } = useQuery({
    queryKey: [ClassroomKeys.Details, classroomId],
    queryFn: async () => {
      const { data } = await apiBase.get<IClassroom>(
        `/classroom/${classroomId}`
      );
      return data;
    },
    enabled: !!classroomId,
    gcTime: Infinity,
    staleTime: Infinity,
  });

  return {
    classroom,
    isLoadingClassroom,
    errorClassroom,
    refetchClassroom,
  };
};
