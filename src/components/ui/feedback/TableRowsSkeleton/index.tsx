import { getRange } from "@/utils/getRange";
import { memo, ReactElement } from "react";
import { Table } from "@/components/ui/dataDisplay/Table";
import { Skeleton } from "../Skeleton";
import { twMerge } from "tailwind-merge";

interface TableRowsSkeletonProps {
  numberOfRows: number;
  numberOfColumns: number;
}

export const TableRowsSkeleton = memo(
  ({ numberOfRows, numberOfColumns }: TableRowsSkeletonProps): ReactElement => {
    return (
      <>
        {getRange(numberOfRows).map((i) => (
          <Table.Row key={`table-skeleton-row-${i}`}>
            {getRange(numberOfColumns).map((j) => (
              <Table.Data key={`table-skeleton-row-${i}-col-${j}`}>
                <Skeleton
                  className={twMerge(
                    "h-4 max-w-36.5 w-full",
                    j === 0 && "w-8 h-8 rounded-full",
                  )}
                />
              </Table.Data>
            ))}
          </Table.Row>
        ))}
      </>
    );
  },
);

TableRowsSkeleton.displayName = "TableRowsSkeleton";
