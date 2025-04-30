"use client";
import { IList } from "../../listTypes";
import { useMemo } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { ClassroomListsTableRow } from "../ClassroomListsTableRow";
import { useClassroomListsTable } from "./useClassroomListsTable";
import { ClassroomListFormDialog } from "../ClassroomListFormDialog";

interface ClassroomListsTableProps {
  data?: IList[];
  isLoading?: boolean;
  error?: string;
  onTryAgainIfError?: () => void;
}

export const ClassroomListsTable = ({
  isLoading,
  data,
  error,
  onTryAgainIfError,
}: ClassroomListsTableProps) => {
  const { openDialog, closeDialog, listToEdit, loggedUser } =
    useClassroomListsTable();

  const handledDataTable = useMemo(() => {
    if (error) {
      return <FeedBackError onTryAgain={onTryAgainIfError} />;
    }

    if (isLoading) {
      return (
        <>
          {getRange(0, 8).map((index) => (
            <DivTable.Row key={`skeleton-row-${index}-list`}>
              {getRange(0, 3).map((index) => (
                <DivTable.Data key={`skeleton-data-${index}-list`}>
                  <Skeleton className="h-4 max-w-[146px] w-full" />
                </DivTable.Data>
              ))}
            </DivTable.Row>
          ))}
        </>
      );
    }

    return (
      <>
        {data?.map((list) => (
          <ClassroomListsTableRow
            key={`data-${list?.uuid}-list-exercise`}
            list={list}
            onOpenEditModal={() => openDialog(list)}
          />
        ))}
      </>
    );
  }, [data, error, isLoading, onTryAgainIfError, openDialog]);

  return (
    <>
      <div className="flex overflow-auto">
        <DivTable.Container>
          <DivTable.Row header>
            <DivTable.Data>Nome</DivTable.Data>
            {loggedUser?.role === 1 && <DivTable.Data>Progresso</DivTable.Data>}
            {loggedUser?.role === 2 && (
              <DivTable.Data>N° de exercícios</DivTable.Data>
            )}
            <DivTable.Data></DivTable.Data>
          </DivTable.Row>
          {handledDataTable}
          {data?.length === 0 && (
            <div className="flex justify-center items-center p-8">
              <h5 className="text-2xl text-gray-70">Tabela vazia</h5>
            </div>
          )}
        </DivTable.Container>
      </div>
      <ClassroomListFormDialog data={listToEdit} onClose={closeDialog} />
    </>
  );
};
