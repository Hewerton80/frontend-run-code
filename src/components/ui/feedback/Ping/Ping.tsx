import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const pingVariant = {
  info: "bg-info",
};

type PingVariant = keyof typeof pingVariant;

interface PingWrapperProps {
  children?: ReactNode;
  variant?: PingVariant;
  active?: boolean;
}
interface PingProps {
  className?: string;
  variant?: PingVariant;
}

export const Ping = ({ className, variant = "info" }: PingProps) => {
  return (
    <span className={twMerge("size-3", className)}>
      <span className="relative flex size-3">
        <span
          className={twMerge(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            pingVariant[variant]
          )}
        />
        <span
          className={twMerge(
            "relative inline-flex size-3 rounded-full",
            pingVariant[variant]
          )}
        />
      </span>
    </span>
  );
};

export const PingWrapper = forwardRef(
  ({ variant = "info", children, active }: PingWrapperProps, ref?: any) => {
    return (
      <div className="relative w-fit h-fit" ref={ref}>
        {children}
        {active && (
          <Ping
            variant={variant}
            className="absolute top-0 right-0 -mt-1 -mr-1 "
          />
        )}
      </div>
    );
  }
);
