import { ReactNode, forwardRef } from "react";
import { Button, ButtonProps } from "@/components/ui/buttons/Button";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: ReactNode;
}

export const IconButton = forwardRef(
  ({ className, icon, ...restProps }: IconButtonProps, ref?: any) => {
    return (
      <Button
        ref={ref}
        className={twMerge("size-9 px-0! py-0! p-0.5! text-xl!", className)}
        {...restProps}
      >
        {icon}
      </Button>
    );
  }
);
