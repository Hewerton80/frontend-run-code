"use state";
import { forwardRef, useEffect, useId } from "react";
import { twMerge } from "tailwind-merge";
import React, { ComponentProps } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/utils/cn";

export interface CheckboxProps extends ComponentProps<
  typeof RadixCheckbox.Root
> {
  label?: string;
}

export const Checkbox = forwardRef(
  (
    {
      className,
      label,
      id,
      name,
      value,
      disabled,
      ...restProps
    }: CheckboxProps,
    ref?: any,
  ) => {
    const reactId = useId();
    const htmlFor = id || name || reactId;
    useEffect(() => {
      console.log({
        label,
        value,
      });
    }, [value, label]);
    return (
      <div className="flex items-center gap-3">
        <RadixCheckbox.Root
          ref={ref}
          value={value}
          id={htmlFor}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center cursor-pointer",
            "w-5 h-5 border border-primary rounded-md",
            "data-[state=checked]:bg-primary",
            className,
            disabled &&
              cn(
                "cursor-default border-gray-500 data-[state=checked]:bg-gray-500",
              ),
          )}
          {...restProps}
        >
          <RadixCheckbox.Indicator>
            <FaCheck className="text-white text-xs" />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className="text-xs sm:text-sm" htmlFor={htmlFor}>
            {label}
          </label>
        )}
      </div>
    );
  },
);
