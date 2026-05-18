import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: true,
      gcTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  },
});
