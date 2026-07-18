import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-primary/15 text-primary",
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
  destructive: "bg-destructive/15 text-destructive",
  warning: "bg-warning/15 text-warning",
  dark: "bg-muted text-muted-foreground",
};
interface BadgeProps extends ComponentPropsWithRef<"span"> {
  variant: keyof typeof variants;
}
export const Badge = ({
  children,
  className,
  variant,
  ...restProps
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
        "bg-success/15 text-success",
        variants[variant],
        className,
      )}
      {...restProps}
    >
      {children}
    </span>
  );
};
