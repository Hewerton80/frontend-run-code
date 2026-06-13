import { Button } from "@/components/ui/buttons/Button";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { cn } from "@/utils/cn";
import { forwardRef, memo, ReactNode } from "react";

interface ToolBarButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltipTextContent: ReactNode;
  isActive?: boolean;
  className?: string;
}

export const ToolBarButton = memo(
  forwardRef(
    (
      {
        icon,
        onClick,
        disabled,
        isActive,
        tooltipTextContent,
        className,
      }: ToolBarButtonProps,
      ref?: any,
    ) => {
      return (
        <Tooltip textContent={tooltipTextContent}>
          <Button
            ref={ref}
            variantStyle="dark-ghost"
            className={cn(
              "size-8 min-h-8 min-w-8 max-w-8 max-h-8 px-0! py-0! p-0.5! ",
              isActive && "bg-accent text-accent-foreground",
              className,
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {icon}
          </Button>
        </Tooltip>
      );
    },
  ),
);

ToolBarButton.displayName = "ToolBarButton";
