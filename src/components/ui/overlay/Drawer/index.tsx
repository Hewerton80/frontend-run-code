import { ComponentPropsWithoutRef } from "react";
import { FaTimes } from "react-icons/fa";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

const HEADER_HEIGHT = 58;
const FOOTER_HEIGHT = 70;

const Root = DrawerPrimitive.Root;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>,
  ref?: any,
) => (
  <DrawerPrimitive.Overlay
    data-slot="drawer-overlay"
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 supports-backdrop-filter:backdrop-blur-xs",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
  ref?: any,
) => (
  <DrawerPortal data-slot="drawer-portal">
    <DrawerOverlay />
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      aria-describedby="drawer-description"
      aria-description="drawer-description"
      aria-hidden="true"
      aria-labelledby="drawer-title"
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        return false;
      }}
      ref={ref}
      className={cn(
        "group/drawer-content fixed z-50 flex h-auto flex-col bg-background",
        "inset-y-0 right-0 w-full max-w-full sm:max-w-2xl border-l",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        className,
      )}
      {...props}
    >
      {/* <div className="mx-auto mt-4 hidden h-1 w-25 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block" /> */}

      {children}
      <DrawerPrimitive.Close
        className={cn(
          "absolute right-4 top-5 rounded-sm opacity-70 ring-offset-background cursor-pointer",
          "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2",
          "focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
          "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        )}
      >
        <FaTimes className="size-4" />
        <span className="sr-only">Close</span>
      </DrawerPrimitive.Close>
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-header"
    className={cn(
      "flex items-center gap-0.5 p-4 md:gap-0.5 md:text-left border-b bg-background",

      className,
    )}
    style={{ height: HEADER_HEIGHT }}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerTitle = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>,
  ref?: any,
) => (
  <DrawerPrimitive.Title
    ref={ref}
    data-slot="drawer-title"
    className={cn("text-base font-medium text-foreground", className)}
    {...props}
  >
    {children}
  </DrawerPrimitive.Title>
);
DrawerTitle.displayName = "DrawerTitle";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="drawer-footer"
    className={cn(
      "mt-auto flex gap-2 p-4 border-t bg-background z-40",
      className,
    )}
    style={{ height: FOOTER_HEIGHT }}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerBody = (
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>,
  ref?: any,
) => (
  <DrawerPrimitive.Description
    ref={ref}
    data-slot="drawer-body"
    className={cn("flex flex-col flex-1 p-5 overflow-auto", className)}
    style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
    {...props}
  >
    {children}
  </DrawerPrimitive.Description>
);
DrawerBody.displayName = "DrawerBody";

const Drawer = {
  Root,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Body: DrawerBody,
  Close: DrawerClose,
};

export { Drawer };
