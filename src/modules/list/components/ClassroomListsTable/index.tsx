import { useMemo } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { ClassroomListsTableRow } from "./ClassroomListsTableRow";
import { useClassroomListsTable } from "./useClassroomListsTable";
import { ClassroomListFormDialog } from "../ClassroomListFormDialog";
import { Button } from "@/components/ui/buttons/Button";
import { Highlight } from "@/components/ui/feedback/Highlight";
import { Alert } from "@/components/ui/feedback/Alert";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { ClasrromActionsTriggerButton } from "@/modules/classroom/components/ClasrromActionsTriggerButton";
import { ClassroomFormDialog } from "@/modules/classroom/components/ClassroomFormDialog";
import { Card } from "@/components/ui/cards/Card";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

interface ClassroomListsTableProps {
  isLoading?: boolean;
  error?: string;
  onTryAgainIfError?: () => void;
}

export const ClassroomListsTable = ({
  isLoading,
  error,
  onTryAgainIfError,
}: ClassroomListsTableProps) => {
  const {
    handleSetListToEdit,
    openListDialog,
    closeListDialog,
    openClassroomDialog,
    closeClassroomDialog,
    canCreateList,
    classroom,
    isOpenClassroomFormDialog,
    lists,
    isOpenListDialog,
    listToEdit,
    loggedUser,
  } = useClassroomListsTable();

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
      <BackLink to="/home">Voltar para Home</BackLink>
      <div className="flex justify-between items-end gap-4">
        <Card.Title>🏫 {classroom?.name}</Card.Title>
        <div className="flex justify-end gap-2">
          {loggedUser?.role === 2 && (
            <>
              <Tooltip
                align="start"
                textContent="Você não permissão para criar listas nessa turma"
                disableHoverableContent={canCreateList}
              >
                <span
                  className={!canCreateList ? "cursor-not-allowed" : undefined}
                >
                  <Highlight active={lists?.length === 0 && canCreateList}>
                    <Button disabled={!canCreateList} onClick={openListDialog}>
                      Criar Lista
                    </Button>
                  </Highlight>
                </span>
              </Tooltip>
              <ClasrromActionsTriggerButton
                variantStyle="info"
                onClickToEditClassroom={openClassroomDialog}
              />
            </>
          )}
        </div>
      </div>

      <div className="flex overflow-auto">
        {lists?.length === 0 ? (
          <Alert.Root>
            <Alert.Title>Ainda não há listas</Alert.Title>
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
        isOpen={isOpenListDialog}
        data={listToEdit}
        onClose={closeListDialog}
      />
      <ClassroomFormDialog
        isOpen={isOpenClassroomFormDialog}
        classroomId={classroom?.uuid}
        onClose={closeClassroomDialog}
      />
    </>
  );
};
