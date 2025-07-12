"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import {
  ComponentPropsWithoutRef,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { LuX } from "react-icons/lu";
import { twMerge } from "tailwind-merge";
import { useToastStore } from "@/stores/useToastStore";

const durationToClose = 5000;

const ToastProvider = ToastPrimitives.Provider;

const toastDireationVariant = {
  "top-right": twMerge(
    "top-0 right-0",
    "[&_.root]:data-[state=open]:slide-in-from-top-full"
  ),
  "bottom-right": twMerge(
    "bottom-0 right-0",
    "[&_.root]:data-[state=open]:slide-in-from-bottom-full"
  ),
};
export type ToastDirection = keyof typeof toastDireationVariant;

const ToastViewport = (
  {
    className,
    direction = "top-right",
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    direction?: ToastDirection;
  },
  ref?: any
) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={twMerge(
      "viewport fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4",
      "sm:flex-col md:max-w-[420px]",
      toastDireationVariant[direction],
      className
    )}
    {...props}
  />
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = {
  default: twMerge(
    "border bg-background text-foreground",
    "[&_.action]:hover:bg-secondary",
    "[&_.progress]:bg-foreground"
  ),
  success: twMerge(
    "success group bg-success text-success-foreground",
    "[&_.action]:hover:border-success-foreground [&_.action]:border-success-foreground/50",
    "[&_.progress]:bg-white"
  ),
  danger: twMerge(
    "danger group border-danger bg-danger text-danger-foreground",
    "[&_.action]:hover:border-danger-foreground [&_.action]:border-danger-foreground/50",
    "[&_.progress]:bg-white"
  ),
};

export type ToastVariants = keyof typeof toastVariants;

const ToastRoot = (
  {
    className,
    variant = "default",
    // direction = "top-right",
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
    variant?: ToastVariants;
    // direction?: ToastDirection;
  },
  ref?: any
) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={twMerge(
        "root group pointer-events-auto relative flex w-full items-center justify-between",
        "space-x-2 overflow-hidden rounded-md p-4 pr-6 shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0",
        "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=move]:transition-none data-[state=open]:animate-in",
        "data-[state=closed]:animate-out data-[swipe=end]:animate-out",
        "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
        toastVariants[variant],
        className
      )}
      {...props}
    />
  );
};
ToastRoot.displayName = ToastPrimitives.Root.displayName;

const ToastAction = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Action>,
  ref?: any
) => (
  <ToastPrimitives.Action
    ref={ref}
    className={twMerge(
      "action cursor-pointer inline-flex h-8 shrink-0 items-center justify-center rounded-md",
      "border bg-transparent px-3 text-sm font-medium transition-colors ",
      "focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none",
      "disabled:opacity-50",
      className
    )}
    {...props}
  />
);
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Close>,
  ref?: any
) => (
  <ToastPrimitives.Close
    ref={ref}
    className={twMerge(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 cursor-pointer",
      "transition-opacity hover:text-foreground focus:opacity-100",
      "focus:outline-none focus:ring-1 group-hover:opacity-100 mr-0",
      className
    )}
    toast-close=""
    {...props}
  >
    <LuX className="h-4 w-4" />
  </ToastPrimitives.Close>
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Title>,
  ref?: any
) => (
  <ToastPrimitives.Title
    ref={ref}
    className={twMerge("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = (
  {
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof ToastPrimitives.Description>,
  ref?: any
) => (
  <ToastPrimitives.Description
    ref={ref}
    className={twMerge("text-sm opacity-90", className)}
    {...props}
  />
);
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastProgress = () => {
  const [progress, setProgress] = useState(0);
  const { show } = useToastStore();

  useEffect(() => {
    let animationProgressTime: NodeJS.Timeout;

    if (show) {
      animationProgressTime = setTimeout(() => setProgress(100), 100);
    }
    return () => {
      setProgress(0);
      clearTimeout(animationProgressTime);
    };
  }, [show]);

  return (
    <span
      className={twMerge(
        "progress absolute w-full bottom-0 left-0 h-1  transition-transform ease-linear"
      )}
      style={{
        transform: `translateX(-${progress}%)`,
        transitionDuration: `${durationToClose}ms`,
        animationDuration: `${durationToClose}ms`,
      }}
    />
  );
};

type ToastProps = ComponentPropsWithoutRef<typeof ToastRoot>;

type ToastActionElement = ReactElement<typeof ToastAction>;

export { ToastProvider };

export const Toaster = () => {
  //   const { state, } = useToast();
  const {
    show,
    variant = "default",
    title,
    description,
    direction,
    closeToast,
  } = useToastStore();

  useEffect(() => {
    let timerToClose: NodeJS.Timeout;

    if (show) {
      timerToClose = setTimeout(() => {
        closeToast();
      }, durationToClose);
    }
    return () => {
      clearTimeout(timerToClose);
    };
  }, [show, closeToast]);

  return (
    <>
      <ToastRoot
        variant={variant}
        open={show}
        onOpenChange={(value) => !value && closeToast()}
      >
        <div className="flex flex-col gap-1">
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
        </div>
        <ToastAction altText="Close">Ok</ToastAction>
        <ToastClose />
        <ToastProgress />
      </ToastRoot>
      <ToastViewport direction={direction} />
    </>
  );
};
