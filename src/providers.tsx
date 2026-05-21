import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/tanstackQueryHelpers/queryClient";
import { ToastProvider, Toaster } from "./components/ui/feedback/Toaster";
import { Outlet } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";
import { AblyProvider } from "ably/react";
import { realtimeClient } from "./utils/realtimeClient";

export function Providers() {
  return (
    <AblyProvider client={realtimeClient}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ToastProvider>
            <Outlet />
            <Toaster />
          </ToastProvider>
        </NuqsAdapter>
      </QueryClientProvider>
    </AblyProvider>
  );
}
