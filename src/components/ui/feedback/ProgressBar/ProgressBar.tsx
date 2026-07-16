import { cn } from "@/utils/cn";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { ComponentPropsWithoutRef, memo, useEffect, useState } from "react";

const toneBgMap = {
  primary: "linear-gradient(90deg, var(--primary), oklch(0.7 0.2 260))",
  warning: "linear-gradient(90deg, var(--warning), oklch(0.82 0.17 65))",
  success: "linear-gradient(90deg, var(--success), oklch(0.75 0.17 155))",
};
interface ProgressBarProps extends ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  tone?: keyof typeof toneBgMap;
}

const ProgressBar = memo(
  (
    { className, value, tone = "primary", ...restProps }: ProgressBarProps,
    ref?: any,
  ) => {
    const [progress, setProgress] = useState(0);

    const handledValue = value || 0;

    useEffect(() => {
      const timer = setTimeout(() => setProgress(handledValue), 100);
      return () => clearTimeout(timer);
    }, [handledValue]);

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-surface-2",
          className,
        )}
        {...restProps}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-transform ease-in-out duration-700",
          )}
          style={{
            transform: `translateX(-${100 - progress}%)`,
            background: toneBgMap[tone],
          }}
        />
      </ProgressPrimitive.Root>
    );
  },
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
