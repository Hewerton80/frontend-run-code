import { ComponentPropsWithoutRef, forwardRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { BsChevronDown } from "react-icons/bs";
import { PrimitiveAccordion } from "../PrimitiveAccordion";

// import * as PrimitiveAccordion from "@radix-ui/react-accordion";

const AccordionItem = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof PrimitiveAccordion.Item>,
  ref: any
) => (
  <PrimitiveAccordion.Item
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
  }: ComponentPropsWithoutRef<typeof PrimitiveAccordion.Trigger>,
  ref: any
) => (
  <PrimitiveAccordion.Header className="flex">
    <PrimitiveAccordion.Trigger
      ref={ref}
      className={twJoin(
        "not-disabled:cursor-pointer flex flex-1 items-center justify-between py-4 text-sm font-medium",
        "transition-all not-disabled:hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        "disabled:cursor-not-allowed disabled:opacity-50",
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
    </PrimitiveAccordion.Trigger>
  </PrimitiveAccordion.Header>
);
AccordionTrigger.displayName = PrimitiveAccordion.Trigger.displayName;

const AccordionContent = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof PrimitiveAccordion.Content>,
  ref: any
) => (
  <PrimitiveAccordion.Content ref={ref} className="text-sm" {...props}>
    <div className={twMerge("pb-4 pt-0", className)}>{children}</div>
  </PrimitiveAccordion.Content>
);
AccordionContent.displayName = PrimitiveAccordion.Content.displayName;

export const Accordion = {
  Root: PrimitiveAccordion.Root,
  Header: PrimitiveAccordion.Header,
  Item: forwardRef(AccordionItem),
  Trigger: forwardRef(AccordionTrigger),
  Content: forwardRef(AccordionContent),
};
