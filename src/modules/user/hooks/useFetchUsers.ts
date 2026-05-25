import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../userTypets";
import { IPaginationParams, IPaginatedDocs } from "@/types/paginad";
import { removeEmptyKeys } from "@/utils/queryParams";
import { userQueryKeyFactory } from "@/modules/user/utils/userQueryKeyFactory";

export type IGetUsersParams = IPaginationParams;

export const useFetchUsers = (usersParams?: IGetUsersParams) => {
  const { apiBase } = useAxios();

  const normalizedParams = useMemo(
    () => removeEmptyKeys(usersParams),
    [usersParams],
  );

  const {
    data: users,
    isFetching: isUsersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: userQueryKeyFactory.usersList(normalizedParams),
    queryFn: async ({ signal }) => {
      const res = await apiBase.get<IPaginatedDocs<IUser>>("/user", {
        params: normalizedParams,
        signal,
      });
      return res.data ?? { data: [] };
    },
    retry: 0,
  });

  return {
    refetchUsers,
    users,
    isUsersLoading,
    usersError,
  };
};
