import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import style from "./Highlight.module.css";

const highlightsVariant = {
  info: "border-info",
};

type HighlightsVariant = keyof typeof highlightsVariant;
interface HighlightsProps {
  children?: ReactNode;
  className?: string;
  variant?: HighlightsVariant;
  active?: boolean;
}

export const Highlight = ({
  className,
  active,
  children,
  variant = "info",
}: HighlightsProps) => {
  return (
    <div
      className={twMerge(
        "relative w-fit h-fit"
        // active && "animate-ping border-2 ",
        // highlightsVariant[variant],
        // className
      )}
    >
      {children}
      {active && (
        <div
          className={twMerge(
            "absolute inset-0 border-8 rounded-lg",
            // "animate-ping",
            style.root,
            highlightsVariant[variant],
            className
          )}
        />
      )}
    </div>
  );
};
