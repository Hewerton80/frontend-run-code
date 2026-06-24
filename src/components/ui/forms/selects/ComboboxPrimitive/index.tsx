import { Combobox } from "@base-ui/react/combobox";
import { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Spinner } from "@/components/ui/feedback/Spinner";
import { BsChevronDown } from "react-icons/bs";

const inputClassNameBuilder = ({
  isDisabled,
  isError,
}: {
  isDisabled?: boolean;
  isError?: boolean;
}) =>
  cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium ease-linear duration-200",
    "placeholder:text-muted-foreground outline-hidden focus-visible:ring-2",
    "focus-visible:ring-primary/40 ",
    isDisabled && "disabled:cursor-not-allowed disabled:opacity-50",
    isError &&
      "border-danger/60 focus-visible:border-danger focus-visible:ring-danger/40",
  );

interface CommonProps {
  isDisabled?: boolean;
  isError?: boolean;
}

const Root = Combobox.Root;
const Portal = Combobox.Portal;

const InputGroup = ({
  className,
  children,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.InputGroup>) => {
  return (
    <Combobox.InputGroup className={cn("relative group", className)} {...rest}>
      {children}
    </Combobox.InputGroup>
  );
};

const Input = ({
  className,
  isDisabled,
  isError,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Input> & CommonProps) => {
  return (
    <Combobox.Input
      className={cn(
        inputClassNameBuilder({
          isDisabled: !!isDisabled,
          isError: !!isError,
        }),
        className,
      )}
      {...rest}
    />
  );
};

const Icon = ({
  className,
  children,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Icon>) => {
  return (
    <Combobox.Icon
      className={cn("right-3 absolute z-2 top-1/2 -translate-y-1/2", className)}
      {...rest}
    >
      {children}
      <BsChevronDown
        className={cn(
          "shrink-0 size-3 text-neutral-500 transition-transform duration-200",
          "group-data-popup-open:rotate-180",
        )}
      />
    </Combobox.Icon>
  );
};

const Trigger = ({
  className,
  children,
  isDisabled,
  isError,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Trigger> & CommonProps) => {
  return (
    <Combobox.Trigger
      type="button"
      className={cn(
        inputClassNameBuilder({
          isDisabled: !!isDisabled,
          isError: !!isError,
        }),
        "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </Combobox.Trigger>
  );
};

const Value = ({
  placeholder,
  value,
}: ComponentPropsWithRef<typeof Combobox.Value> & {
  value?: ReactNode;
  placeholder?: string;
}) => {
  return (
    <Combobox.Value placeholder={placeholder}>
      <span
        className={cn(
          "inline-flex items-center flex-1 truncate text-sm text-left",
          value ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {value || placeholder || <></>}
      </span>
    </Combobox.Value>
  );
};

const Positioner = ({
  className,
  children,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Positioner>) => {
  return (
    <Combobox.Positioner
      sideOffset={4}
      className={cn("isolate z-9999 pointer-events-auto", className)}
      {...rest}
    >
      {children}
    </Combobox.Positioner>
  );
};

const Popup = ({
  className,
  children,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Popup>) => {
  return (
    <Combobox.Popup
      data-slot="select-content"
      data-align-trigger={false}
      className={cn(
        "max-h-60 min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto",
        "relative isolate border rounded-md shadow-lg bg-popover",
        "duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2",
        "data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"',
        className,
      )}
      {...rest}
    >
      {children}
    </Combobox.Popup>
  );
};

const Loading = ({ isLoadingText }: { isLoadingText: string }) => {
  return (
    <span className="py-4 flex items-center justify-center text-sm text-neutral-500">
      <Spinner className="mr-2" />
      {isLoadingText}
    </span>
  );
};

const List = ({
  children,
  className,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.List>) => {
  return (
    <Combobox.List
      className={cn(
        "flex flex-col outline-none overflow-y-auto data-empty:[&+*]:block",
        className,
      )}
      {...rest}
    >
      {children}
    </Combobox.List>
  );
};

const Item = ({
  children,
  className,
  isActive,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Item> & { isActive?: boolean }) => {
  return (
    <Combobox.Item
      className={cn(
        "px-2 py-1.5 text-sm cursor-pointer transition-colors outline-none",
        "data-highlighted:bg-accent",
        isActive &&
          cn(
            "bg-primary/80 text-primary-foreground data-highlighted:bg-primary/70",
          ),
        className,
      )}
      {...rest}
    >
      {children}
    </Combobox.Item>
  );
};

const ItemIndicator = ({
  className,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.ItemIndicator>) => {
  return (
    <Combobox.ItemIndicator
      className={cn("flex items-center justify-center", className)}
      {...rest}
    />
  );
};

const Status = ({
  children,
  className,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Status>) => {
  return (
    <Combobox.Status className={cn(className)} {...rest}>
      {children}
    </Combobox.Status>
  );
};

const Empty = ({
  children,
  className,
  ...rest
}: ComponentPropsWithRef<typeof Combobox.Empty>) => {
  return (
    <Combobox.Empty
      className={cn(
        "hidden px-3 py-2 text-sm text-muted-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </Combobox.Empty>
  );
};

const ComboboxPrimitive = {
  Root,
  Input,
  InputGroup,
  Icon,
  Trigger,
  Value,
  Popup,
  Portal,
  Positioner,
  List,
  Item,
  Empty,
  Loading,
  ItemIndicator,
  Status,
};

export { ComboboxPrimitive };
