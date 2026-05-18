import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/tanstackQueryHelpers/queryClient";
import { ToastProvider, Toaster } from "./components/ui/feedback/Toaster";
import { Outlet } from "react-router-dom";

export function Providers() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    </ToastProvider>
  );
}
