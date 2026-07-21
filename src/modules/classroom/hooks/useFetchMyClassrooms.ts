import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export interface FetchMyClassroomsResponse {
  author: {
    name: string;
    email: string;
  };
  uuid: string;
  status: number;
  createdAt: string;
  name: string;
  languages: string;
  description: string | null;
  color: string;
  emoji: string;
  totalExercisesCount: number;
  contentVersion: number;
  createdBy: number;
}

export const useFetchMyClassrooms = () => {
  const { apiBase } = useAxios();

  const {
    data: myClassroomsRecords,
    isFetching: isFetchingMyClassrooms,
    error: myClassroomsError,
    refetch: refetchMyClassrooms,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.myClassrooms(),
    queryFn: async ({ signal }) => {
      const { data: response } = await apiBase.get<FetchMyClassroomsResponse[]>(
        "/classroom/me",
        { signal },
      );

      // Semeia o cache individual de cada turma para navegação cache-first
      response?.forEach((classroom) => {
        if (classroom.uuid) {
          setItemInCache<FetchMyClassroomsResponse>(
            classroomQueryKeyFactory.menuItem(classroom.uuid),
            classroom,
          );
        }
      });

      return response ?? [];
    },
    enabled: true,
    retry: 0,
  });

  return {
    myClassroomsRecords,
    isFetchingMyClassrooms,
    myClassroomsError,
    refetchMyClassrooms,
  };
};
