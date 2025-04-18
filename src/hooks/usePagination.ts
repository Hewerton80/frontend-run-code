import { useCallback } from "react";
import useQueryParams from "./useQueryParams";
import { IPaginationParams } from "@/types/paginad";
import { isNumberable } from "@/utils/isType";
import { useSearchParams } from "next/navigation";

//default values for pagination
export const usePagination = (defaultValues?: IPaginationParams) => {
  const { setQueryParams } = useQueryParams<IPaginationParams>();
  const searchParams = useSearchParams();

  const paginationParams: IPaginationParams = {
    currentPage: isNumberable(searchParams.get("currentPage"))
      ? Number(searchParams.get("currentPage"))
      : defaultValues?.currentPage || 1,
    perPage: isNumberable(searchParams.get("perPage"))
      ? Number(searchParams.get("perPage"))
      : defaultValues?.perPage || 25,
  };

  const goToPage = useCallback(
    (page: number) => {
      setQueryParams({ currentPage: page });
    },
    [setQueryParams]
  );

  return { goToPage, paginationParams };
};
