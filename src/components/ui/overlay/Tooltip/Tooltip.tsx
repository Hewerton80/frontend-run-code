import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TooltipContentProps {
  delayDuration?: number;
  className?: string;
  sideOffset?: number;
  children?: ReactNode;
  textContent?: ReactNode;
  open?: boolean;
  disableHoverableContent?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const Tooltip = ({
  className,
  sideOffset = 4,
  delayDuration = 0,
  align,
  side,
  textContent,
  open,
  children,
  disableHoverableContent,
  onOpenChange,
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Provider
      disableHoverableContent={disableHoverableContent}
      delayDuration={delayDuration}
    >
      <TooltipPrimitive.Root
        disableHoverableContent={disableHoverableContent}
        open={open}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={sideOffset}
            side={side}
            align={align}
            className={twMerge(
              "z-50 overflow-hidden rounded-md  px-3 py-1.5",
              "text-xs bg-card text-card-foreground border animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              "data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2",
              disableHoverableContent && "hidden",
              className
            )}
          >
            {textContent}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
