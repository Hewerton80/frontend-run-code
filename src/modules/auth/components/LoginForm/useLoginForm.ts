import { useRouter } from "next/navigation";
import { LoginResponse, useLogin } from "../../hooks/useLogin";
import { LoginCredentials, useLoginFormSchema } from "../../schemas/loginSchem";

export const useLoginForm = () => {
  const {
    loginFormControl,
    loginFormState,
    loginFormHandleSubmit,
    loginFormRegister,
  } = useLoginFormSchema();

  const router = useRouter();

  const { isLogging, login } = useLogin();

  const handleLogin = (loginCredentials: LoginCredentials) => {
    const onSuccess = ({ access_token }: LoginResponse) => {
      console.log("Success");
      localStorage.setItem("access_token", access_token);
      router.replace("/home");
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
