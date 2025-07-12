import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { LoginCredentials } from "../schemas/loginSchem";

export interface LoginResponse {
  access_token: string;
}

export const useLogin = () => {
  const { apiBase } = useAxios();
  const { isPending: isLogging, mutate: login } = useMutation({
    mutationFn: (loginCredentials: LoginCredentials) =>
      apiBase
        .post<{ access_token: string }>("/auth/sign-in", loginCredentials)
        .then((res) => res.data),
  });

  return { isLogging, login };
};
