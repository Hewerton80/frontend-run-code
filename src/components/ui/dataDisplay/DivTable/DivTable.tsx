import { ComponentPropsWithRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface TableContainerProps extends ComponentPropsWithRef<"div"> {}
interface RowProps extends ComponentPropsWithRef<"div"> {
  header?: boolean;
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

function Row({ children, header, className, ...restProps }: RowProps) {
  return (
    <div
      role="row"
      className={twMerge(
        "flex flex-col md:flex-row gap-0 md:gap-2",
        header &&
          "hidden md:flex text-xs font-medium h-10 text-muted-foreground border-t-transparent",
        className
      )}
      {...restProps}
    >
      {children}
    </div>
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

const DivTable = {
  Container,
  Row,
  Data,
};

export { DivTable };
