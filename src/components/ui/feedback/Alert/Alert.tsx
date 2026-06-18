import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import {
  LuTerminal,
  LuInfo,
  LuTriangleAlert,
  LuBan,
  LuBadgeCheck,
} from "react-icons/lu";
import { cn } from "@/utils/cn";

const alertVariants = {
  default: {
    icon: <LuTerminal className="stroke-foreground" />,
    className: "bg-background text-foreground border",
  },
  info: {
    icon: <LuInfo className="stroke-info" />,
    className: "bg-info/10 text-info",
  },
  success: {
    icon: <LuBadgeCheck className="stroke-success-foreground" />,
    className: "bg-success text-success-foreground",
  },
  warning: {
    icon: <LuTriangleAlert className="stroke-warning-foreground" />,
    className: "bg-warning text-warning-foreground",
  },
  danger: {
    icon: <LuBan className="stroke-danger-foreground" />,
    className: "bg-danger text-danger-foreground",
  },
};

interface AlertRootProps {
  className?: string;
  children?: ReactNode;
  variant?: keyof typeof alertVariants;
  hideIcon?: boolean;
}

interface AlertTitleProps {
  className?: string;
  children?: ReactNode;
}

interface AlertDescriptionProps {
  className?: string;
  children?: ReactNode;
}

const Root = ({
  variant = "default",
  hideIcon,
  className,
  children,
}: AlertRootProps) => {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg px-4 py-3 text-sm",
        !hideIcon &&
          cn(
            "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 [&>svg]:text-foreground",
            "**:[[role=alert-title]]:pl-7 **:[[role=alert-description]]:pl-7",
          ),
        alertVariants[variant].className,
        className,
      )}
    >
      {!hideIcon && alertVariants[variant].icon}
      {children}
    </div>
  );
};

const Title = ({ className, children }: AlertTitleProps) => {
  return (
    <h5
      role="alert-title"
      className={cn("font-bold leading-none tracking-tight", className)}
    >
      {children}
    </h5>
  );
};

const Description = ({ className, children }: AlertDescriptionProps) => {
  return (
    <div role="alert-description" className={cn("text-sm mt-1", className)}>
      {children}
    </div>
  );
};

const Alert = {
  Root,
  Title,
  Description,
};

export { Alert };
