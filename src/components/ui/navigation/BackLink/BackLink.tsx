import { IoArrowBack } from "react-icons/io5";
import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

interface BackLinkProps extends ComponentPropsWithRef<typeof Link> {}

export const BackLink = ({
  children,
  className,
  ...restProps
}: BackLinkProps) => {
  return (
    <Link
      className={twMerge(
        "hover:underline inline-flex items-center gap-1.5 px-0.5 text-sm font-medium",
        "underline-offset-4 w-fit",
        className
      )}
      {...restProps}
    >
      <IoArrowBack />
      <span>{children}</span>
    </Link>
  );
};
