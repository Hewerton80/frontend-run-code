import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import style from "./Highlight.module.css";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const highlightsVariant = {
  info: "border-info",
  "dark-ghost": "bg-accent",
};

type HighlightsVariant = keyof typeof highlightsVariant;
interface HighlightsProps {
  children?: ReactNode;
  className?: string;
  variant?: HighlightsVariant;
  active?: boolean;
}

export const Highlight = forwardRef(
  (
    { className, active, children, variant = "info" }: HighlightsProps,
    ref?: any,
  ) => {
    return (
      <div ref={ref} className={cn("relative w-fit h-fit", className)}>
        {active && (
          <div className={cn(style.root, highlightsVariant[variant])} />
        )}
        <Slot aria-label="Highlight wrapper">{children}</Slot>
      </div>
    );
  },
);
