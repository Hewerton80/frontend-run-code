import { cn } from "@/utils/cn";
import { ComponentPropsWithRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type TableContainerProps = ComponentPropsWithRef<"div">;
type TableProps = ComponentPropsWithRef<"table">;
type TbodyProps = ComponentPropsWithRef<"tbody">;
type TheadProps = ComponentPropsWithRef<"thead">;
type ThProps = ComponentPropsWithRef<"th">;
type TrProps = ComponentPropsWithRef<"tr">;
type TdProps = ComponentPropsWithRef<"td">;

function Table({ children, className, ...restProps }: TableProps, ref?: any) {
  return (
    <table
      ref={ref}
      className={cn("w-full text-sm bg-card", className)}
      {...restProps}
    >
      {children}
    </table>
  );
}

function TableContainer(
  { className, children, ...restProps }: TableContainerProps,
  ref?: any,
) {
  return (
    <div
      className={cn("rounded-3xl overflow-x-hidden border w-full", className)}
      {...restProps}
    >
      <div ref={ref} className={cn("flex flex-col w-full overflow-x-auto ")}>
        {children}
      </div>
    </div>
  );
}

function Thead({ children, className, ...restProps }: TheadProps, ref?: any) {
  return (
    <thead ref={ref} className={cn("text-xs", className)} {...restProps}>
      {children}
    </thead>
  );
}

function Th({ children, className, ...restProps }: ThProps, ref?: any) {
  return (
    <th
      ref={ref}
      className={cn(
        "align-middle px-5 py-3 text-[11px] font-bold uppercase tracking-widest",
        "text-muted-foreground border-b",
        className,
      )}
      {...restProps}
    >
      <div className="flex items-start">{children}</div>
    </th>
  );
}

function Tr({ children, ...restProps }: TrProps, ref?: any) {
  return (
    <tr ref={ref} {...restProps}>
      {children}
    </tr>
  );
}

function Tbody({ children, className, ...restProps }: TbodyProps, ref?: any) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr+tr_td]:border-t font-normal text-base", className)}
      {...restProps}
    >
      {children}
    </tbody>
  );
}

function Td({ children, className, ...restProps }: TdProps, ref?: any) {
  return (
    <td ref={ref} className={cn("px-5 py-4", className)} {...restProps}>
      {children}
    </td>
  );
}

Table.Container = forwardRef(TableContainer);
Table.Head = forwardRef(Thead);
Table.HeadCell = forwardRef(Th);
Table.Row = forwardRef(Tr);
Table.Body = forwardRef(Tbody);
Table.Data = forwardRef(Td);

export { Table };

Table.Container.displayName = "Table.Container";
Table.Head.displayName = "Table.Head";
Table.HeadCell.displayName = "Table.HeadCell";
Table.Row.displayName = "Table.Row";
Table.Body.displayName = "Table.Body";
Table.Data.displayName = "Table.Data";
