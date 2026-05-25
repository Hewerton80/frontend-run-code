import { useAxios } from "@/hooks/useAxios";
import { IUser } from "@/modules/user/userTypets";
import { useQuery } from "@tanstack/react-query";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useEffect } from "react";
import { authQueryKeyFactory } from "@/modules/auth/utils/authQueryKeyFactory";

/**
 * Busca o usuário autenticado (/auth/me) e sincroniza com o store Zustand.
 * Executado manualmente via `fetchMe()` — não dispara automaticamente.
 */
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
    queryKey: authQueryKeyFactory.me(),
    enabled: false,
    retry: 0,
    queryFn: ({ signal }): Promise<IUser | null> =>
      apiBase.get<IUser | null>("/auth/me", { signal }).then((res) =>
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
