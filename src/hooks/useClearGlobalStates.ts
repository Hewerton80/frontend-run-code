import { useQueryClient } from "@tanstack/react-query";

export const useClearGlobalStates = () => {
  const queryClient = useQueryClient();

  const clearGlobalStates = () => {
    queryClient.clear();
    queryClient.getQueryCache().clear();
  };

  return { clearGlobalStates };
};
