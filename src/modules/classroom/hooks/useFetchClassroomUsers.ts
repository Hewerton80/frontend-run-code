import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { classroomQueryKeyFactory } from "@/modules/classroom/utils/classroomQueryKeyFactory";
import { IPaginatedDocs, IPaginationParams } from "@/types/paginated";
import { IUser } from "@/modules/user/userTypets";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";
import { useMemo } from "react";
import { removeEmptyKeys } from "@/utils/queryParams";
import { isNumberable } from "@/utils/isType";

export const CLASSROOM_USER_PER_PAGE = 10;

export type IFetchClassroomUsersParams = IPaginationParams;

export const useFetchClassroomUsers = (
  classroomId: string,
  params?: IFetchClassroomUsersParams,
) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(() => {
    const _params = {
      currentPage: isNumberable(params?.currentPage)
        ? Number(params?.currentPage)
        : 1,
      perPage: CLASSROOM_USER_PER_PAGE,
    };
    return removeEmptyKeys(_params);
  }, [params]);

  const {
    data: classroomUsersRecords,
    isFetching: isFetchingClassroomUsers,
    error: classroomUsersError,
    refetch: refetchClassroomUsers,
  } = useQuery({
    queryKey: classroomQueryKeyFactory.users(classroomId, normalizedParams),
    queryFn: async ({ signal }) => {
      const { data: response } = await apiBase.get<IPaginatedDocs<IUser>>(
        `/classroom/${classroomId}/users`,
        { signal, params: normalizedParams },
      );

      response?.data?.forEach((user) => {
        if (user.uuid) {
          setItemInCache<IUser>(
            classroomQueryKeyFactory.userRow(user.uuid),
            user,
          );
        }
      });

      return (
        response ?? { data: [], total: 0, limit: 10, page: 1, totalPages: 0 }
      );
    },
    enabled: !!classroomId,
    retry: 0,
  });

  return {
    classroomUsersRecords,
    isFetchingClassroomUsers,
    classroomUsersError,
    refetchClassroomUsers,
  };
};
