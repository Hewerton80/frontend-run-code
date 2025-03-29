"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ProgressBarProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  showValue?: boolean;
  customValueText?: string;
}

const ProgressBar = (
  {
    className,
    value,
    showValue,
    customValueText,
    ...restProps
  }: ProgressBarProps,
  ref?: any
) => {
  const [progress, setProgress] = useState(0);

  const handledValue = value || 0;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(handledValue), 100);
    return () => clearTimeout(timer);
  }, [handledValue]);

  return (
    <div className="flex items-center gap-2">
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
      {showValue && (
        <span className="text-sm">{customValueText || `${handledValue}%`}</span>
      )}
    </div>
  );
};

ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar };
