import { IoArrowBack } from "react-icons/io5";
import ProgressLink from "../ProgressLink/ProgressLink";
import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

interface BackLinkProps extends ComponentPropsWithRef<typeof ProgressLink> {}

export const BackLink = ({
  children,
  className,
  ...restProps
}: BackLinkProps) => {
  return (
    <ProgressLink
      className={twMerge(
        "hover:underline inline-flex items-center gap-1.5 px-0.5 text-sm font-medium",
        "underline-offset-4 w-fit",
        className
      )}
      {...restProps}
    >
      <IoArrowBack />
      <span>{children}</span>
    </ProgressLink>
  );
};
