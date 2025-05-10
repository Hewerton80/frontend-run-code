"use client";
import { IList } from "../../listTypes";
import { useMemo } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { ClassroomListsTableRow } from "./ClassroomListsTableRow";
import { useClassroomListsTable } from "./useClassroomListsTable";
import { ClassroomListFormDialog } from "../ClassroomListFormDialog";
import { Button } from "@/components/ui/buttons/Button";
import { useGetClassroomById } from "@/modules/classroom/hooks/useGetClassroomById";
import { useParams } from "next/navigation";
import { Highlight } from "@/components/ui/feedback/Highlight";
import { Alert } from "@/components/ui/feedback/Alert";
import { PingWrapper } from "@/components/ui/feedback/Ping";
import { BackLink } from "@/components/ui/navigation/BackLink";

interface ClassroomListsTableProps {
  // data?: IList[];
  isLoading?: boolean;
  error?: string;
  onTryAgainIfError?: () => void;
}

export const ClassroomListsTable = ({
  isLoading,
  // data: lists,
  error,
  onTryAgainIfError,
}: ClassroomListsTableProps) => {
  const {
    handleSetListToEdit,
    openDialog,
    closeDialog,
    isOpen,
    listToEdit,
    loggedUser,
  } = useClassroomListsTable();

  const params = useParams<{ classroomId: string }>();

  const { classroom } = useGetClassroomById(params?.classroomId);

  const lists = useMemo(() => {
    return classroom?.lists?.map((list) => ({
      ...list,
      classroom,
    }));
  }, [classroom]);

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
        {lists?.map((list) => (
          <ClassroomListsTableRow
            key={`${list?.uuid}-list-exercise`}
            list={list}
            onOpenEditModal={() => handleSetListToEdit(list)}
          />
        ))}
      </>
    );
  }, [lists, error, isLoading, onTryAgainIfError, handleSetListToEdit]);

  return (
    <>
      <div className="flex justify-between items-end gap-4">
        <BackLink href="/home">Voltar para Home</BackLink>

        <div className="flex justify-end gap-4">
          {loggedUser?.uuid === classroom?.author?.uuid && (
            <PingWrapper active={lists?.length === 0}>
              <Button onClick={openDialog}>Criar Lista</Button>
            </PingWrapper>
          )}
        </div>
      </div>
      <div className="flex overflow-auto">
        {lists?.length === 0 ? (
          <Alert.Root>
            <Alert.Title>Turma não há listas</Alert.Title>
            <Alert.Description>
              Crie uma lista para começar a adicionar exercícios.
            </Alert.Description>
          </Alert.Root>
        ) : (
          <DivTable.Container>
            <DivTable.Row header>
              <DivTable.Data>Nome</DivTable.Data>
              {loggedUser?.role === 1 && (
                <DivTable.Data>Progresso</DivTable.Data>
              )}
              {loggedUser?.role === 2 && (
                <DivTable.Data>N° de exercícios</DivTable.Data>
              )}
              <DivTable.Data></DivTable.Data>
            </DivTable.Row>
            {handledDataTable}
          </DivTable.Container>
        )}
      </div>
      <ClassroomListFormDialog
        isOpen={isOpen}
        data={listToEdit}
        onClose={closeDialog}
      />
    </>
  );
};
