import * as ProgressPrimitive from "@radix-ui/react-progress";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {}

const ProgressBar = (
  { className, value, ...restProps }: ProgressBarProps,
  ref?: any
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
      className={twMerge(
        "relative h-2 w-full overflow-hidden rounded-full bg-info/20",
        className
      )}
      {...restProps}
    >
      <ProgressPrimitive.Indicator
        className={twMerge(
          "h-full w-full flex-1 bg-info",
          "transition-transform ease-in-out duration-700"
        )}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};

ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar };
