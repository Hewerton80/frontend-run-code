import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { twJoin, twMerge } from "tailwind-merge";
import { BsChevronDown } from "react-icons/bs";
import style from "./Accordion.module.css";

const AccordionRoot = AccordionPrimitive.Root;

const AccordionItem = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
  ref: any
) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={twJoin("border-b", className)}
    {...props}
  />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
  ref: any
) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={twJoin(
        "cursor-pointer flex flex-1 items-center justify-between py-4 text-sm font-medium",
        "transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <BsChevronDown
        className={twMerge(
          "size-4 ml-4 shrink-0 text-muted-foreground transition-transform duration-200"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
  ref: any
) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={twMerge("overflow-hidden text-sm", style.animation)}
    {...props}
  >
    <div className={twMerge("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export const Accordion = {
  Root: AccordionRoot,
  Item: forwardRef(AccordionItem),
  Trigger: forwardRef(AccordionTrigger),
  Content: forwardRef(AccordionContent),
};
