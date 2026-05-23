import { useFetchPoolingSubmissionsResult } from "@/modules/submission/hooks/useFetchPoolingSubmissionsResult";
import { memo, ReactNode } from "react";

export const GlobalWrapper = memo(({ children }: { children?: ReactNode }) => {
  useFetchPoolingSubmissionsResult();

  return <>{children}</>;
});
