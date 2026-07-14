import * as RadixSwitch from "@radix-ui/react-switch";
import { twMerge } from "tailwind-merge";
import { forwardRef, ComponentPropsWithRef } from "react";
import { FormLabel } from "../FormLabel";
import { cn } from "@/utils/cn";

export interface SwitchProps extends ComponentPropsWithRef<
  typeof RadixSwitch.Root
> {
  switchClassName?: string;
  formControlClassName?: string;
  label?: string;
  subTitle?: string;
  disabled?: boolean;
}

export const Switch = forwardRef(
  (
    {
      label,
      formControlClassName,
      required,
      subTitle,
      switchClassName,
      ...restProps
    }: SwitchProps,
    ref?: any,
  ) => {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-surface/40 px-3.5 py-3.5",
          formControlClassName,
        )}
      >
        <div className="flex flex-col">
          {label && (
            <FormLabel
              required={required}
              className="mb-0 mr-2"
              htmlFor={restProps?.id}
            >
              {label}
            </FormLabel>
          )}
          {subTitle && (
            <span className="text-xs text-muted-foreground">{subTitle}</span>
          )}
        </div>
        <RadixSwitch.Root
          required={required}
          ref={ref}
          className={cn(
            "w-11 h-6 bg-surface-2 disabled:bg-gray-400 rounded-full relative shrink-0",
            "data-[state=checked]:bg-primary data-[state=checked]:disabled:bg-primary/10",
            "not-disabled:cursor-pointer",
            switchClassName,
          )}
          {...restProps}
        >
          <RadixSwitch.Thumb
            className={cn(
              "absolute left-0 translate-x-1 top-0.5 duration-100 ease-linear transition-transform",
              "block size-5 rounded-full bg-white shadow",
              // inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-300 translate-x-0.5            )}
              "data-[state=checked]:translate-x-5",
            )}
          />
        </RadixSwitch.Root>
      </div>
    );
  },
);
