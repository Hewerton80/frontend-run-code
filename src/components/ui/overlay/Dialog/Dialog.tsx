import { ComponentPropsWithoutRef } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { FaTimes } from "react-icons/fa";
import {
  Card,
  CardBodyProps,
  CardFooterProps,
} from "@/components/ui/cards/Card";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const sizes = {
  xs: "max-w-[444px]",
  sm: "max-w-[600px]",
  md: "max-w-[900px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
};

const Root = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>,
  ref?: any
) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={twMerge(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: keyof typeof sizes;
}

const DialogContent = (
  { className, children, size = "sm", ...props }: DialogContentProps,
  ref?: any
) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg translate-x-[-50%] sm:rounded-lg",
        "translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={twMerge(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background",
          "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2",
          "focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        )}
      >
        <FaTimes className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twMerge(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={twMerge(
      "flex sm:items-center flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
  ref?: any
) => (
  <DialogPrimitive.Title
    ref={ref}
    className={twMerge(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
  ref?: any
) => (
  <DialogPrimitive.Description
    ref={ref}
    className={twMerge("text-sm text-muted-foreground", className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export const Dialog = {
  Root,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogTrigger,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// };
