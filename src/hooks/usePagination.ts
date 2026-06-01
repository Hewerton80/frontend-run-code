import { useMemo } from "react";
import { IPaginationParams } from "@/types/paginad";
import { useQueryState, parseAsInteger } from "nuqs";

interface IUsePaginationProps {
  currentPage?: number;
  perPage?: number;
  currentPageQueryName?: string;
  perPageQueryName?: string;
}
export const usePagination = (defaultValues?: IUsePaginationProps) => {
  const [currentPage, setCurrentPage] = useQueryState(
    defaultValues?.currentPageQueryName || "currentPage",
    parseAsInteger.withDefault(defaultValues?.currentPage || 1),
  );
  const [perPage] = useQueryState(
    defaultValues?.perPageQueryName || "perPage",
    parseAsInteger.withDefault(defaultValues?.perPage || 10),
  );

  const paginationParams = useMemo<IPaginationParams>(
    () => ({ currentPage, perPage }),
    [currentPage, perPage],
  );

  return { goToPage: setCurrentPage, paginationParams };
};
