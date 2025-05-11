import { forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import style from "./Highlight.module.css";
import { Slot } from "@radix-ui/react-slot";

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
    ref?: any
  ) => {
    return (
      <div ref={ref} className={twMerge("relative w-fit h-fit")}>
        <Slot className="z-[1]">{children}</Slot>
        {active && (
          <div
            className={twMerge(
              style.root,
              highlightsVariant[variant],
              className
            )}
          />
        )}
      </div>
    );
  }
);
