import * as RadixSwitch from "@radix-ui/react-switch";
import { twMerge } from "tailwind-merge";
import { forwardRef, ComponentPropsWithRef } from "react";
import { FormLabel } from "../FormLabel";

export interface SwitchProps
  extends ComponentPropsWithRef<typeof RadixSwitch.Root> {
  switchClassName?: string;
  formControlClassName?: string;
  label?: string;
  disabled?: boolean;
}

export const Switch = forwardRef(
  (
    {
      label,
      formControlClassName,
      required,
      switchClassName,
      ...restProps
    }: SwitchProps,
    ref?: any
  ) => {
    return (
      <div className={twMerge("flex items-center", formControlClassName)}>
        {label && (
          <FormLabel
            required={required}
            className="mb-0 mr-2"
            htmlFor={restProps?.id}
          >
            {label}
          </FormLabel>
        )}
        <RadixSwitch.Root
          required={required}
          ref={ref}
          className={twMerge(
            "w-9 h-3.5 bg-gray-600 disabled:bg-gray-400 rounded-full relative ",
            "data-[state=checked]:bg-primary/40 data-[state=checked]:disabled:bg-primary/10",
            "not-disabled:cursor-pointer",
            switchClassName
          )}
          {...restProps}
        >
          <RadixSwitch.Thumb
            className={twMerge(
              "absolute left-0 -top-[3px] duration-100",
              "block w-5 h-5 rounded-full bg-gray-400 shadow-xs",
              "data-[state=checked]:left-4 data-[state=checked]:bg-primary",
              "data-[state=checked]:shadow-primary"
            )}
          />
        </RadixSwitch.Root>
      </div>
    );
  }
);
