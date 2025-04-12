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
    queryFn: () =>
      apiBase.get<IUser | null>("/auth/me").then((res) => res.data || null),
    enabled: true,
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
