import { CONSTANTS } from "@/utils/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, { message: CONSTANTS.VALIDATION.REQUIRED_FIELD }),
  password: z.string().min(1, { message: CONSTANTS.VALIDATION.REQUIRED_FIELD }),
});

export type LoginCredentials = z.infer<typeof loginFormSchema>;

export const useLoginFormSchema = () => {
  const {
    control: loginFormControl,
    formState: loginFormState,
    handleSubmit: loginFormHandleSubmit,
    setError: loginFormSetError,
    register: loginFormRegister,
  } = useForm<LoginCredentials>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
  });

  return {
    loginFormControl,
    loginFormState,
    loginFormSetError,
    loginFormHandleSubmit,
    loginFormRegister,
  };
};
