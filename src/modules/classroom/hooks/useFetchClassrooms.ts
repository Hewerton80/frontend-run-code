import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export type IFetchClassroomsParams = IPaginationParams;

/**
 * Busca a lista paginada de turmas.
 * Semeia o cache individual de cada turma via `setItemInCache` para
 * permitir navegação cache-first ao detalhe.
 * Suporta cancelamento automático via AbortSignal.
 */
export const useFetchClassrooms = (params?: IFetchClassroomsParams) => {
  const { apiBase } = useAxios();

  /** Normaliza os params removendo chaves vazias — estabiliza a queryKey */
  const normalizedParams = useMemo(() => removeEmptyKeys(params), [params]);

  const {
    data: classroomsRecords,
    isFetching: isFetchingClassrooms,
    error: classroomsError,
    refetch: refetchClassrooms,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.list(normalizedParams),
    queryFn: async ({ signal }) => {
      const { data: response } = await apiBase.get<IPaginatedDocs<IClassroom>>(
        "/classroom",
        { params: normalizedParams, signal },
      );

      // Semeia o cache individual de cada turma para navegação cache-first
      response?.data?.forEach((classroom) => {
        if (classroom.uuid) {
          setItemInCache<IClassroom>(
            classroomQueryKeyFactory.detail(classroom.uuid),
            classroom,
          );
        }
      });

      return (
        response ?? { data: [], total: 0, limit: 10, page: 1, totalPages: 0 }
      );
    },
    retry: 0,
  });

  return {
    classroomsRecords,
    isFetchingClassrooms,
    classroomsError,
    refetchClassrooms,
  };
};
