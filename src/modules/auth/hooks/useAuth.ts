import { useAxios } from "@/hooks/useAxios";
import { IUser } from "@/modules/user/userTypets";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { apiBase } = useAxios();

  const {
    data: loggedUser,
    isLoading: isLoadingUser,
    error: errorUser,
    isError: isErrorUser,
    refetch: refetchLoggedUser,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: (): Promise<IUser | null> =>
      apiBase.get<IUser | null>("/auth/me").then((res) =>
        res.data
          ? {
              ...res.data,
              username: `${res.data.name} ${res.data.surname}`,
            }
          : null
      ),
  });

  const hasNotAccess = (errorUser as any)?.response?.status === 401;

  return {
    loggedUser,
    isLoadingUser,
    hasNotAccess,
    isErrorUser,
    refetchLoggedUser,
  };
};
