import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser, UserKey } from "../userTypets";
import { IPaginationParams, IPaginatedDocs } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";

export interface IGetUsersParams extends IPaginationParams {}

export const useGetUsers = (usersParams?: IGetUsersParams) => {
  const { apiBase } = useAxios();
  const {
    data: users,
    isFetching: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryFn: () =>
      apiBase
        .get<IPaginatedDocs<IUser>>("/user", {
          params: removeEmptyKeys(usersParams),
        })
        .then((res) => res.data || { data: [] }),
    queryKey: [UserKey.List, ...Object.values(removeEmptyKeys(usersParams))],
    enabled: true,
  });

  return {
    refetchUsers,
    users,
    isUsersLoading,
    usersError,
  };
};
