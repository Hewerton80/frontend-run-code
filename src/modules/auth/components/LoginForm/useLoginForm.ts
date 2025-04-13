import { useRouter } from "next/navigation";
import { LoginResponse, useLogin } from "../../hooks/useLogin";
import { LoginCredentials, useLoginFormSchema } from "../../schemas/loginSchem";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";

export const useLoginForm = () => {
  const {
    loginFormControl,
    loginFormState,
    loginFormHandleSubmit,
    loginFormRegister,
  } = useLoginFormSchema();

  const router = useRouter();
  const [storedAccessToken, setAccessToken] = useSessionStorage("access_token");
  const { isLogging, login } = useLogin();

  useEffect(() => {
    if (storedAccessToken) {
      router.replace("/home");
    }
  }, [storedAccessToken, router]);

  const handleLogin = (loginCredentials: LoginCredentials) => {
    const onSuccess = ({ access_token }: LoginResponse) => {
      setAccessToken(access_token);
    };
    const onError = (error: any) => {
      console.log("Error", error);
    };
    login(loginCredentials, { onSuccess, onError });
  };

  return {
    loginFormControl,
    loginFormState,
    isLogging,
    login: loginFormHandleSubmit(handleLogin),
    loginFormRegister,
  };
};
