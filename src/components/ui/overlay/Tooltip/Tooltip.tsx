import { cn } from "@/utils/cn";
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
  hideTextContent?: boolean;
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
        // open={true}
        onOpenChange={onOpenChange}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            hideWhenDetached
            sideOffset={sideOffset}
            side={side}
            align={align}
            className={twMerge(
              "z-50 overflow-hidden rounded-[6px] px-3 py-1.5 text-xs bg-tooltip text-card-foreground",
              "animate-in data-[state=closed]:animate-out",
              "zoom-in-40 data-[state=closed]:zoom-out-95",
              "data-[state=closed]:fade-out-0 duration-50",
              disableHoverableContent && "hidden",
              className,
            )}
          >
            {textContent}
            <TooltipPrimitive.Arrow
              className={cn(
                "fill-tooltip w-5 h-2.5",
                "animate-in data-[state=closed]:animate-out",
                "zoom-in-10 data-[state=closed]:zoom-out-95",
              )}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
