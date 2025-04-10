import { useLogin } from "../../hooks/useLogin";
import { useLoginFormSchema } from "../../schemas/loginSchem";

export const useLoginForm = () => {
  const {
    loginFormControl,
    loginFormGetValues,
    loginFormHandleSubmit,
    loginFormSetError,
    loginFormState,
    loginFormTrigger,
  } = useLoginFormSchema();

  const { isLogging, login } = useLogin();

  return { loginFormControl, loginFormState, isLogging, login };
};
