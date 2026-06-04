import { useMemo } from "react";
import { IPaginationParams } from "@/types/paginated";
import { useQueryState, parseAsInteger } from "nuqs";

interface IUsePaginationProps {
  initialParams?: IPaginationParams;
  currentPageParamName?: string;
  perPageParamName?: string;
}

export const usePagination = (defaultValues?: IUsePaginationProps) => {
  const [currentPage, setCurrentPage] = useQueryState(
    defaultValues?.currentPageParamName || "currentPage",
    parseAsInteger.withDefault(defaultValues?.initialParams?.currentPage || 1),
  );
  const [perPage] = useQueryState(
    defaultValues?.perPageParamName || "perPage",
    parseAsInteger.withDefault(defaultValues?.initialParams?.perPage || 25),
  );

  const paginationParams = useMemo<IPaginationParams>(
    () => ({ currentPage, perPage }),
    [currentPage, perPage],
  );

  return { goToPage: setCurrentPage, paginationParams };
};
