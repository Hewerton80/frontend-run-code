import { memo, useMemo, ReactNode, useState, useEffect, useId } from "react";
import { Table } from "@/components/ui/dataDisplay/Table";
import { TableRowsSkeleton } from "@/components/ui/feedback/TableRowsSkeleton";
import {
  PaginationBar,
  PaginationBarProps,
} from "@/components/ui/navigation/PaginationBar";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "../buttons/Button";
import { Alert } from "../feedback/Alert";

export interface IRenderItemInfo<TItem> {
  item: TItem;
  index: number;
}

export interface IDataTableProps<TItem> {
  data?: TItem[];
  columns: string[];
  isLoading?: boolean;
  pagination?: PaginationBarProps | null;
  numberOfSkeletonRows?: number;
  errorMessage?: string;
  onRetry?: () => void;
  renderItem: (info: IRenderItemInfo<TItem>) => ReactNode;
  idExtractor: (item: TItem) => string;
}

function DataTableComponent<TItem>({
  data,
  columns,
  isLoading = false,
  pagination,
  numberOfSkeletonRows = 10,
  errorMessage,
  onRetry,
  renderItem,
}: IDataTableProps<TItem>) {
  const reactId = useId();

  const [memoisedPagination, setMemoisedPagination] =
    useState<PaginationBarProps | null>(null);

  useEffect(() => {
    if (!pagination || !data) return;
    setMemoisedPagination(pagination);
  }, [pagination, data]);

  const isEmpty = useMemo(
    () =>
      !isLoading && !errorMessage && Array.isArray(data) && data.length === 0,
    [isLoading, data, errorMessage],
  );

  const handledContent = useMemo(() => {
    if (isLoading) {
      return (
        <TableRowsSkeleton
          numberOfColumns={columns.length}
          numberOfRows={numberOfSkeletonRows}
        />
      );
    }
    if (errorMessage) {
      return (
        <Table.Row>
          <Table.Data colSpan={columns.length}>
            <Alert.Root variant="danger">
              <Alert.Title>{errorMessage}</Alert.Title>
              <Alert.Description>
                <div className="flex flex-col pt-2">
                  <Button variantStyle="outline" onClick={onRetry}>
                    Tentar novamente
                  </Button>
                </div>
              </Alert.Description>
            </Alert.Root>
          </Table.Data>
        </Table.Row>
      );
    }
    if (isEmpty) {
      return (
        <Table.Row>
          <Table.Data colSpan={columns.length}>
            <div className="flex justify-center items-center p-8">
              <h5 className="text-2xl text-foreground-subtle">
                Nenhuma informação encontrada
              </h5>
            </div>
          </Table.Data>
        </Table.Row>
      );
    }
    return data?.map((item, index) => (
      <Slot
        key={`row-${reactId}-${index}`}
        className={isLoading ? "hidden" : undefined}
      >
        {renderItem({ item, index })}
      </Slot>
    ));
  }, [
    data,
    columns,
    isLoading,
    errorMessage,
    numberOfSkeletonRows,
    onRetry,
    isEmpty,
    renderItem,
    reactId,
  ]);

  return (
    <div>
      <Table.Container>
        <Table>
          <Table.Head>
            <Table.Row>
              {columns.map((col, i) => (
                <Table.HeadCell key={`col-${reactId}-${i}`}>
                  {col}
                </Table.HeadCell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body>{handledContent}</Table.Body>
        </Table>
      </Table.Container>
      {memoisedPagination && (
        <div className="flex w-full justify-end p-4">
          <PaginationBar
            currentPage={memoisedPagination.currentPage}
            onChangePage={memoisedPagination?.onChangePage}
            perPage={memoisedPagination.perPage}
            totalPages={memoisedPagination.totalPages}
            totalRecords={memoisedPagination.totalRecords}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}

DataTableComponent.displayName = "DataTable";
const DataTable = memo(DataTableComponent) as typeof DataTableComponent;

export { DataTable };
