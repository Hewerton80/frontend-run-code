import { IGetUsersParams, useFetchUsers } from "../../hooks/useFetchUsers";
import { usePagination } from "@/hooks/usePagination";

export const useListUserts = () => {
  const { goToPage, paginationParams } = usePagination();

  const usersParams: IGetUsersParams = {
    ...paginationParams,
  };

  const { refetchUsers, users, isUsersLoading, usersError } =
    useFetchUsers(usersParams);

  return { refetchUsers, goToPage, users, isUsersLoading, usersError };
};
