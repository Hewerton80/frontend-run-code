import { Ref, forwardRef, useState } from "react";
import { Input, InputProps } from "../Input";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<
  InputProps,
  "type" | "rightIcon" | "leftItcon" | "onClickRightIcon" | "onClickLeftIcon"
>;

export const PasswordInput = forwardRef(
  (props: PasswordInputProps, ref?: Ref<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={showPassword ? <Eye /> : <EyeOff />}
        onClickRightIcon={() =>
          setShowPassword((currentState) => !currentState)
        }
        {...props}
      />
    );
  },
);
