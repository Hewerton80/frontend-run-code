import useQueryParams from "@/hooks/useQueryParams";
import { IGetUsersParams, useGetUsers } from "../../hooks/useGetUsers";
import { usePagination } from "@/hooks/usePagination";

export const useListUserts = () => {
  const { setQueryParams } = useQueryParams<IGetUsersParams>();
  const { goToPage, paginationParams } = usePagination();

  const usersParams: IGetUsersParams = {
    ...paginationParams,
  };

  const { refetchUsers, users, isUsersLoading, usersError } =
    useGetUsers(usersParams);

  return { refetchUsers, goToPage, users, isUsersLoading, usersError };
};
