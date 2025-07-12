import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as PrimitiveRadixAccordion from "@radix-ui/react-accordion";
import style from "./PrimitiveAccordion.module.css";
import { twMerge } from "tailwind-merge";

const AccordionContent = (
  {
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof PrimitiveRadixAccordion.Content>,
  ref: any
) => (
  <PrimitiveRadixAccordion.Content
    ref={ref}
    className={twMerge("overflow-hidden", style.animation, className)}
    {...props}
  >
    {children}
  </PrimitiveRadixAccordion.Content>
);
AccordionContent.displayName = PrimitiveRadixAccordion.Content.displayName;

export const PrimitiveAccordion = {
  Root: PrimitiveRadixAccordion.Root,
  Header: PrimitiveRadixAccordion.Header,
  Item: PrimitiveRadixAccordion.AccordionItem,
  Trigger: PrimitiveRadixAccordion.AccordionTrigger,
  Content: forwardRef(AccordionContent),
};
