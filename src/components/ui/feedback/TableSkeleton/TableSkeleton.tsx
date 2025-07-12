import { getRange } from "@/utils/getRange";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface TableSkeletonProps {
  numRows: number;
  columns: IColmunDataTable[];
}

export function TableSkeleton({ numRows, columns }: TableSkeletonProps) {
  const handledColumns = useMemo<IColmunDataTable[]>(() => {
    return columns.map((column, i) => ({
      ...column,
      onParse: () => (
        <Skeleton
          key={`skeleton-cell-${i}`}
          className={twMerge(
            "  w-full",
            i === columns?.length - 1 ? "w-8 h-8 ml-auto" : "h-4 max-w-[146px]"
          )}
        />
      ),
    }));
  }, [columns]);

  const data = useMemo(() => getRange(0, numRows), [numRows]);

  return <DataTable columns={handledColumns} data={data} />;
}
