import { useMemo } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../userTypets";
import { IPaginationParams, IPaginatedDocs } from "@/types/paginated";
import { removeEmptyKeys } from "@/utils/queryParams";
import { userQueryKeyFactory } from "@/modules/user/utils/userQueryKeyFactory";
import { setItemInCache } from "@/utils/tanstackQueryHelpers/setItemInCache";

export type IFetchUsersParams = IPaginationParams;

export const useFetchUsers = (usersParams?: IFetchUsersParams) => {
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

      res.data?.data?.forEach((user) => {
        if (user.uuid) {
          setItemInCache<IUser>(userQueryKeyFactory.userRow(user.uuid), user);
        }
      });

      return res.data ?? { data: [] };
    },
    enabled: true,
    retry: 0,
  });

  return {
    refetchUsers,
    users,
    isUsersLoading,
    usersError,
  };
};
