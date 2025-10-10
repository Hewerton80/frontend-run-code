import { Ref, forwardRef, useState } from "react";
// import { EyeCloseIcon } from "@/components/icons/EyeCloseIcon";
// import { EyeOpenIcon } from "@/components/icons/EyeOpenIcon";
import { Input, InputProps } from "../Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps
  extends Omit<
    InputProps,
    "type" | "rightIcon" | "leftItcon" | "onClickRightIcon" | "onClickLeftIcon"
  > {}

export const PasswordInput = forwardRef(
  (props: PasswordInputProps, ref?: Ref<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={showPassword ? <FaEye /> : <FaEyeSlash />}
        onClickRightIcon={() =>
          setShowPassword((currentState) => !currentState)
        }
        {...props}
      />
    );
  }
);
