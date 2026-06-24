import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/tanstackQueryHelpers/queryClient";
import { Outlet } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";
import { AblyProvider } from "ably/react";
import { realtimeClient } from "./utils/realtimeClient";
import { ToastManager } from "./components/ui/feedback/ToastManager";

export function Providers() {
  return (
    <AblyProvider client={realtimeClient}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <Outlet />
          <ToastManager />
        </NuqsAdapter>
      </QueryClientProvider>
    </AblyProvider>
  );
}
