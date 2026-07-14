import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface FormLabelProps extends ComponentPropsWithRef<"label"> {
  required?: boolean;
}

export function FormLabel({
  children,
  className,
  required,
  ...restProps
}: FormLabelProps) {
  return (
    <label
      className={twMerge(
        "mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground",
        required && "after:content-['*'] after:text-destructive",
        className,
      )}
      {...restProps}
    >
      {children}
    </label>
  );
}
