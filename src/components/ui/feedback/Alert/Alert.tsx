import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import {
  LuTerminal,
  LuInfo,
  LuTriangleAlert,
  LuBan,
  LuBadgeCheck,
} from "react-icons/lu";

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
}

interface AlertTitleProps {
  className?: string;
  children?: ReactNode;
}

interface AlertDescriptionProps {
  className?: string;
  children?: ReactNode;
}

const Root = ({ variant = "default", className, children }: AlertRootProps) => {
  return (
    <div
      role="alert"
      className={twMerge(
        "relative w-full rounded-lg px-4 py-3 text-sm",
        "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
        alertVariants[variant].className,
        className
      )}
    >
      {alertVariants[variant].icon}
      {children}
    </div>
  );
};

const Title = ({ className, children }: AlertTitleProps) => {
  return (
    <h5
      className={twMerge(
        "mb-1 pl-7 font-bold leading-none tracking-tight",
        className
      )}
    >
      {children}
    </h5>
  );
};

const Description = ({ className, children }: AlertDescriptionProps) => {
  return (
    <div
      className={twMerge(
        "text-sm pl-7 [&_p]:leading-relaxed translate-y-[-3px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Alert = {
  Root,
  Title,
  Description,
};
