import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { useEffect } from "react";
import { authQueryKeyFactory } from "@/modules/auth/utils/authQueryKeyFactory";
import { LoggedUser } from "../types/LoggedUser";

export const useAuth = () => {
  const { apiBase } = useAxios();
  const { setLoggedUser } = useLoggedUser();

  const {
    data: me,
    isLoading: isLoadingUser,
    error: errorUser,
    refetch: fetchMe,
  } = useQuery({
    queryKey: authQueryKeyFactory.me(),
    enabled: false,
    retry: 0,
    queryFn: ({ signal }) =>
      apiBase.get<LoggedUser>("/auth/me", { signal }).then((res) => res.data),
  });

  useEffect(() => {
    if (!me) return;
    setLoggedUser(me);
  }, [me, setLoggedUser]);

  return {
    isLoadingUser,
    errorUser,
    fetchMe,
  };
};
