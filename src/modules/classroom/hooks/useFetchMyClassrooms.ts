import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

/**
 * Busca as turmas do usuário logado (/classroom/me).
 * Semeia o cache individual de cada turma para navegação cache-first.
 * Suporta cancelamento automático via AbortSignal.
 */
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
      const { data: response } = await apiBase.get<IClassroom[]>(
        "/classroom/me",
        { signal },
      );

      // Semeia o cache individual de cada turma para navegação cache-first
      response?.forEach((classroom) => {
        if (classroom.uuid) {
          setItemInCache<IClassroom>(
            classroomQueryKeyFactory.detail(classroom.uuid),
            classroom,
          );
        }
      });

      return response ?? [];
    },
    retry: 0,
  });

  return {
    myClassroomsRecords,
    isFetchingMyClassrooms,
    myClassroomsError,
    refetchMyClassrooms,
  };
};
