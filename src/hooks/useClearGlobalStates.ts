import { queryClient } from "@/utils/tanstackQueryHelpers/queryClient";
import { useCallback } from "react";

export const useClearGlobalStates = () => {
  const clearGlobalStates = useCallback(() => {
    queryClient.clear();
    queryClient.getQueryCache().clear();
  }, []);
  return { clearGlobalStates };
};
