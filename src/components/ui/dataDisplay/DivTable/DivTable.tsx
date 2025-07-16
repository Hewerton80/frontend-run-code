import {
  ComponentPropsWithRef,
  JSX,
  ReactElement,
  ReactNode,
  useId,
} from "react";
import { twMerge } from "tailwind-merge";
import { PrimitiveAccordion } from "../PrimitiveAccordion";
import { IconButton } from "../../buttons/IconButton";
import { BsChevronDown } from "react-icons/bs";

interface TableContainerProps extends ComponentPropsWithRef<"div"> {}
interface RowProps {
  className?: string;
  children?: ReactNode;
  header?: boolean;
  // disabled?: boolean;
  disableAccordion?: boolean;
  accordionContent?: ReactNode;
  onAccordionChange?: (value: string) => void;
}
interface TdProps extends ComponentPropsWithRef<"div"> {}

function Container({ className, children, ...restProps }: TableContainerProps) {
  return (
    <div
      role="table"
      className={twMerge(
        "[&_[role=row]]:border-t",
        "flex flex-col rounded-md overflow-x-auto border w-full text-sm",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
}

function Row({
  children,
  header,
  className,
  disableAccordion,
  accordionContent,
  onAccordionChange,
}: RowProps) {
  const id = useId();
  return (
    <PrimitiveAccordion.Root
      onValueChange={onAccordionChange}
      disabled={disableAccordion}
      type="single"
      collapsible
      asChild
      // className={twMerge(
      //   "[&:not([data-disabled])_[role=row]]:hover:bg-muted/50",
      // )}
    >
      <PrimitiveAccordion.Item value={id}>
        <div
          role="row"
          className={twMerge(
            "flex flex-col md:flex-row gap-0 md:gap-2",
            header &&
              "hidden md:flex text-xs font-medium h-10 text-muted-foreground border-t-transparent",
            "duration-[.15s] ease-in-out transition-colors",
            disableAccordion ? "[&_.trigger]:hidden" : "hover:bg-muted/50",
            className
          )}
        >
          {children}
        </div>
        {accordionContent && (
          <PrimitiveAccordion.Content>
            {accordionContent}
          </PrimitiveAccordion.Content>
        )}
      </PrimitiveAccordion.Item>
    </PrimitiveAccordion.Root>
  );
}

function Data({ children, className, ...restProps }: TdProps) {
  return (
    <div
      className={twMerge("flex flex-1 items-center p-2 font-normal", className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

function AccordionTrigger() {
  return (
    <PrimitiveAccordion.Trigger
      className="trigger [&[data-state=open]_.arrow]:rotate-180"
      asChild
    >
      <IconButton
        variantStyle="dark-ghost"
        icon={
          <BsChevronDown
            className={twMerge(
              "arrow size-4 transition-transform duration-200"
            )}
          />
        }
      />
    </PrimitiveAccordion.Trigger>
  );
}

const DivTable = {
  Container,
  Row,
  Data,
  // Body,
  AccordionContent: PrimitiveAccordion.Content,
  AccordionTrigger: AccordionTrigger,
};

export { DivTable };
