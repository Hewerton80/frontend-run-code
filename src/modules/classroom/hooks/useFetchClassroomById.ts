import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { getItemFromQueryCache } from "@/utils/tanstackQueryHelpers/getItemFromQueryCache";

/**
 * Busca o detalhe de uma turma por ID.
 * Aplica cache-first: exibe o dado do cache instantaneamente enquanto refetch ocorre em background.
 * Suporta cancelamento automático via AbortSignal.
 * Não executa sem `classroomId`.
 */
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
    initialData: () =>
      getItemFromQueryCache<IClassroom>(
        classroomQueryKeyFactory.detail(classroomId),
      ),
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
