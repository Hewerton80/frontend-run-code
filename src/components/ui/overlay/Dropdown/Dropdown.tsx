import React, { ComponentPropsWithRef, forwardRef } from "react";
import * as PrimitiveDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";

export type DropdownProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Root
>;

export type DropdowTriggerProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Trigger
>;

export type DropdowSubTriggerProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.SubTrigger
>;

export type DropdowContentProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Content
>;

export type DropdowSubContentProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.SubContent
>;

export type DropdowItemProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Item
>;

export type DropdowLabelProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Label
>;

export type DropdowSeparatorProps = ComponentPropsWithRef<
  typeof PrimitiveDropdown.Separator
>;

const contentClasses = cn(
  "flex flex-col z-9999 min-w-[8rem] overflow-hidden rounded-md border ",
  "bg-popover p-1 text-popover-foreground data-[state=open]:animate-in",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 ",
  "data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 ",
  "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 ",
  "data-[side=top]:slide-in-from-bottom-2",
);

const Root = ({ children }: DropdownProps) => {
  return (
    <PrimitiveDropdown.Root data-slot="dropdown-root" modal={false}>
      {children}
    </PrimitiveDropdown.Root>
  );
};

const Trigger = (
  { children, ...restProps }: DropdowTriggerProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Trigger
      data-slot="dropdown-trigger"
      ref={ref}
      {...restProps}
    >
      {children}
    </PrimitiveDropdown.Trigger>
  );
};

const SubTrigger = (
  { children, className, ...restProps }: DropdowSubTriggerProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm",
        "outline-hidden focus:bg-accent data-[state=open]:bg-accent",
        className,
      )}
      ref={ref}
      {...restProps}
    >
      {children}
    </PrimitiveDropdown.SubTrigger>
  );
};

const Content = (
  {
    children,
    className,
    sideOffset = 4,
    align = "end",
    ...restProps
  }: DropdowContentProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Portal>
      <PrimitiveDropdown.Content
        data-slot="dropdown-content"
        ref={ref}
        className={cn(contentClasses, "shadow-lg", className)}
        sideOffset={sideOffset}
        align={align}
        {...restProps}
      >
        {children}
      </PrimitiveDropdown.Content>
    </PrimitiveDropdown.Portal>
  );
};

const SubContent = (
  { children, className, sideOffset = 4, ...restProps }: DropdowSubContentProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Portal>
      <PrimitiveDropdown.SubContent
        data-slot="dropdown-sub-content"
        ref={ref}
        sideOffset={sideOffset}
        className={cn(contentClasses, "shadow-md", className)}
        {...restProps}
      >
        {children}
      </PrimitiveDropdown.SubContent>
    </PrimitiveDropdown.Portal>
  );
};

const Item = (
  { children, className, ...restProps }: DropdowItemProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Item
      data-slot="dropdown-item"
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-md",
        "px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent",
        "focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...restProps}
    >
      {children}
    </PrimitiveDropdown.Item>
  );
};

const Label = (
  { children, className, ...restProps }: DropdowLabelProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Label
      data-slot="dropdown-label"
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...restProps}
    >
      {children}
    </PrimitiveDropdown.Label>
  );
};

const Separator = (
  { className, ...restProps }: DropdowSeparatorProps,
  ref?: any,
) => {
  return (
    <PrimitiveDropdown.Separator
      data-slot="dropdown-separator"
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...restProps}
    />
  );
};

const Dropdown = {
  Root,
  Trigger: forwardRef(Trigger),
  SubTrigger: forwardRef(SubTrigger),
  Content: forwardRef(Content),
  Sub: PrimitiveDropdown.Sub,
  SubContent: forwardRef(SubContent),
  Item: forwardRef(Item),
  Label: forwardRef(Label),
  Separator: forwardRef(Separator),
};

export { Dropdown };
