import { LoginResponse, useLogin } from "../../hooks/useLogin";
import { LoginCredentials, useLoginFormSchema } from "../../schemas/loginSchem";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const {
    loginFormControl,
    loginFormState,
    loginFormHandleSubmit,
    loginFormSetError,
    loginFormRegister,
  } = useLoginFormSchema();

  const navigate = useNavigate();
  const [storedAccessToken, setAccessToken] = useSessionStorage("access_token");
  const { isLogging, login } = useLogin();

  useEffect(() => {
    if (storedAccessToken) {
      navigate("/home", { replace: true });
    }
  }, [storedAccessToken, navigate]);

  const handleLogin = (loginCredentials: LoginCredentials) => {
    const onSuccess = ({ access_token }: LoginResponse) => {
      setAccessToken(access_token);
    };
    const onError = (error: any) => {
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        loginFormSetError("email", { message: " " });
        loginFormSetError("password", { message: "Email ou senha inválidos" });
      } else {
        loginFormSetError("email", { message: " " });
        loginFormSetError("password", { message: "Erro ao fazer login" });
      }
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
