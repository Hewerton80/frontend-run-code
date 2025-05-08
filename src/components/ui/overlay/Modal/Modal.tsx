import React, { ComponentPropsWithoutRef, ReactNode } from "react";
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

export interface ModalProps {
  children: ReactNode;
  id?: string;
  className?: string;
  show?: boolean;
  hideCloseIcon?: boolean;
  disableBackdropClick?: boolean;
  size?: keyof typeof sizes;
  onClose?: () => void;
}
export interface ModalTitleProps extends ComponentPropsWithoutRef<"div"> {}
export interface ModalBodyProps extends CardBodyProps {}
export interface ModalFooterProps extends CardFooterProps {}

const Root = ({
  children,
  className,
  show,
  hideCloseIcon,
  disableBackdropClick,
  size = "sm",
  onClose,
  ...restProps
}: ModalProps) => {
  return (
    <DialogPrimitive.Root open={show}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={twMerge(
            "fixed inset-0 z-50 bg-black/80  "
            // "data-[state=open]:animate-in",
            // "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
            // "data-[state=open]:fade-in-0"
          )}
          // className="z-10000 fixed inset-0 bg-black/70"
          onClick={() => !disableBackdropClick && onClose?.()}
        />
        <Card.Root asChild>
          <DialogPrimitive.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={twMerge(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              " z-50 w-full",
              "duration-200",
              "data-[state=open]:animate-in",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
              "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95",
              "data-[state=open]:zoom-in-95",
              // "data-[state=closed]:slide-out-to-left-1/2",
              // "data-[state=closed]:slide-out-to-top-[48%]",
              // "data-[state=open]:slide-in-from-left-1/2",
              // "data-[state=open]:slide-in-from-top-[48%]",
              sizes[size],
              className
            )}
            {...restProps}
          >
            {children}
            {!hideCloseIcon && (
              <DialogPrimitive.Close
                asChild
                className="absolute top-5 right-6 p-1 cursor-pointer text-foreground"
                // className="absolute top-5 right-6 p-1 cursor-pointer text-foreground"
                onClick={onClose}
                role="button"
                aria-label="Close"
              >
                <span>
                  <FaTimes />
                </span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </Card.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
const Title = ({ children, ...restProps }: ModalTitleProps) => {
  return (
    <Card.Header>
      <DialogPrimitive.Title asChild>
        <Card.Title {...restProps}>{children}</Card.Title>
      </DialogPrimitive.Title>
    </Card.Header>
  );
};

const Body = ({ children, ...restProps }: ModalBodyProps) => {
  return (
    <DialogPrimitive.Description asChild>
      <Card.Body {...restProps}>{children}</Card.Body>
    </DialogPrimitive.Description>
  );
};

function Footer({ children, className, ...restProps }: ModalFooterProps) {
  return (
    <Card.Footer
      orientation="end"
      className={twMerge("pt-0", className)}
      {...restProps}
    >
      {children}
    </Card.Footer>
  );
}
const Modal = { Root, Title, Body, Footer };
// Modal.Title = Title;
// Modal.Body = Body;
// Modal.Footer = Footer;

export { Modal };

// const Dialog = DialogPrimitive.Root;

// const DialogTrigger = DialogPrimitive.Trigger;

// const DialogPortal = DialogPrimitive.Portal;

// const DialogClose = DialogPrimitive.Close;

// const DialogOverlay = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Overlay>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay
//     ref={ref}
//     className={twMerge(
//       "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//       className
//     )}
//     {...props}
//   />
// ));
// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// const DialogContent = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
// >(({ className, children, ...props }, ref) => (
//   <DialogPortal>
//     <DialogOverlay />
//     <DialogPrimitive.Content
//       ref={ref}
//       className={twMerge(
//         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//         <FaTimes className="h-4 w-4" />
//         <span className="sr-only">Close</span>
//       </DialogPrimitive.Close>
//     </DialogPrimitive.Content>
//   </DialogPortal>
// ));
// DialogContent.displayName = DialogPrimitive.Content.displayName;

// const DialogHeader = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={twMerge(
//       "flex flex-col space-y-1.5 text-center sm:text-left",
//       className
//     )}
//     {...props}
//   />
// );
// DialogHeader.displayName = "DialogHeader";

// const DialogFooter = ({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) => (
//   <div
//     className={twMerge(
//       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
//       className
//     )}
//     {...props}
//   />
// );
// DialogFooter.displayName = "DialogFooter";

// const DialogTitle = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Title>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title
//     ref={ref}
//     className={twMerge(
//       "text-lg font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ));
// DialogTitle.displayName = DialogPrimitive.Title.displayName;

// const DialogDescription = React.forwardRef<
//   React.ElementRef<typeof DialogPrimitive.Description>,
//   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
// >(({ className, ...props }, ref) => (
//   <DialogPrimitive.Description
//     ref={ref}
//     className={twMerge("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));
// DialogDescription.displayName = DialogPrimitive.Description.displayName;

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
