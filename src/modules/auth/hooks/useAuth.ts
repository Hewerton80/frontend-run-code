import { useAxios } from "@/hooks/useAxios";
import { IUser } from "@/modules/user/userTypets";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { apiBase, axiosConfig } = useAxios();
  console.log({ headers: axiosConfig.headers });
  const {
    data: loggedUser,
    isLoading: isLoadingUser,
    error: errorUser,
    refetch: refetchLoggedUser,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: () =>
      apiBase.get<IUser | null>("/auth/me").then((res) => res.data || null),
    enabled: true,
  });

  return {
    loggedUser,
    isLoadingUser,
    errorUser,
    refetchLoggedUser,
  };
};
