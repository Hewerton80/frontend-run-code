import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginated";
import { removeEmptyKeys } from "@/utils/queryParams";
import { IClassroom } from "@/modules/classroom/classroomType";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export type IFetchClassroomsParams = IPaginationParams;

export const useFetchClassrooms = (params?: IFetchClassroomsParams) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(() => removeEmptyKeys(params), [params]);

  const {
    data: classroomsRecords,
    isFetching: isFetchingClassrooms,
    error: classroomsError,
    refetch: refetchClassrooms,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.pages(normalizedParams),
    enabled: true,
    queryFn: async ({ signal }) => {
      const { data: response } = await apiBase.get<IPaginatedDocs<IClassroom>>(
        "/classroom",
        { params: normalizedParams, signal },
      );

      response?.data?.forEach((classroom) => {
        if (classroom.uuid) {
          setItemInCache<IClassroom>(
            classroomQueryKeyFactory.row(classroom.uuid),
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
