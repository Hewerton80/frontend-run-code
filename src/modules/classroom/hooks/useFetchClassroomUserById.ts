import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { ITeacher } from "@/modules/user/userTypets";
import { getItemFromQueryCache } from "@/utils/tanstackQueryHelpers/getItemFromQueryCache";

/**
 * Busca o detalhe de um usuário específico de uma turma.
 * Aplica cache-first: exibe o dado do cache instantaneamente enquanto refetch ocorre em background.
 * Suporta cancelamento automático via AbortSignal.
 * Não executa sem `userUuId`.
 */
export const useFetchClassroomUserById = (
  classroomId: string,
  userUuId?: string | null,
) => {
  const { apiBase } = useAxios();

  const {
    data: classroomUser,
    isFetching: isFetchingClassroomUser,
    error: classroomUserError,
    refetch: refetchClassroomUser,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.user(classroomId, userUuId),
    queryFn: ({ signal }) =>
      apiBase
        .get<ITeacher>(`/classroom/${classroomId}/users/${userUuId}`, {
          signal,
        })
        .then((res) => res.data),
    initialData: () =>
      getItemFromQueryCache<ITeacher>(
        classroomQueryKeyFactory.user(classroomId, userUuId),
      ),
    enabled: !!userUuId,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 0,
  });

  return {
    classroomUser,
    isFetchingClassroomUser,
    classroomUserError,
    refetchClassroomUser,
  };
};
