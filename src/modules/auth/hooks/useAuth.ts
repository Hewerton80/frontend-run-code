import { useAxios } from "@/hooks/useAxios";
import { IUser } from "@/modules/user/userTypets";
import { useQuery } from "@tanstack/react-query";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useEffect } from "react";

export const useAuth = () => {
  const { apiBase } = useAxios();
  const { setLoggedUser } = useLoggedUser();

  const {
    data: me,
    isLoading: isLoadingUser,
    error: errorUser,
    isError: isErrorUser,
    refetch: fetchMe,
  } = useQuery({
    queryKey: ["auth"],
    enabled: false,
    queryFn: (): Promise<IUser | null> =>
      apiBase.get<IUser | null>("/auth/me").then((res) =>
        res.data
          ? {
              ...res.data,
              username: `${res.data.name} ${res.data.surname}`,
            }
          : null,
      ),
  });

  useEffect(() => {
    if (!me) return;
    setLoggedUser(me);
  }, [me, setLoggedUser]);

  return {
    isLoadingUser,
    errorUser,
    isErrorUser,
    fetchMe,
  };
};
