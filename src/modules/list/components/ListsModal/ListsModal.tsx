"use client";
import { Modal } from "@/components/ui/overlay/Modal";
import { IClassroom } from "@/modules/classroom/classroomType";
import { useListsModal } from "./useListsModal";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { IListProblem } from "../../listProblemTypes";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { DateTime } from "@/utils/dateTime";
import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";

type ListRecord = Record<string, IListProblem>;

interface ListsModalProps {
  classroom?: IClassroom;
}

export const ListsModal = ({ classroom }: ListsModalProps) => {
  const {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    closeModal,
    goToPage,
    refetchListProblems,
  } = useListsModal(classroom!);

  const currentClassroomListsRecords = useMemo<ListRecord>(() => {
    const result = {} as ListRecord;
    classroom?.listsProblems?.forEach((list) => {
      result[list?.uuid!] = list;
    });
    return result;
  }, [classroom]);

  const [classroomListsRecordsToAdd, setClassroomListsRecordsToAdd] =
    useState<ListRecord>({} as ListRecord);

  const quantitySelected = useMemo(() => {
    return Object.keys(classroomListsRecordsToAdd).length;
  }, [classroomListsRecordsToAdd]);

  const handleCheck = (list: IListProblem) => {
    setClassroomListsRecordsToAdd((prev) => {
      const newRecords = { ...prev };
      if (newRecords[list?.uuid!]) {
        delete newRecords[list?.uuid!];
      } else {
        newRecords[list?.uuid!] = list;
      }
      return newRecords;
    });
  };

  const columns: IColmunDataTable<IListProblem>[] = [
    {
      field: "uuid",
      label: "",
      onParse: (list) =>
        !currentClassroomListsRecords?.[list?.uuid!] ? (
          <span className="flex ml-4">
            <Checkbox
              checked={!!classroomListsRecordsToAdd?.[list?.uuid!]}
              onCheckedChange={() => handleCheck(list)}
            />
          </span>
        ) : (
          <></>
        ),
    },
    {
      field: "title",
      label: "Título",
      onParse: (list) => (
        <div className="flex flex-col">
          <p className="line-clamp-1" title={list?.title}>
            {list?.title}
          </p>
          <span className="text-xs text-muted-foreground">
            Criada em: {DateTime.format(list?.createdAt!, "dd MMM, yyyy")}
          </span>
        </div>
      ),
    },
    {
      field: "author",
      label: "Autor",
      onParse: (list) => <GroupedUserInfo user={list?.author!} />,
    },
  ];

  return (
    <Modal.Root show={true} onClose={closeModal} size="xl">
      <Modal.Title>Adicionar Listas</Modal.Title>
      <Modal.Body>
        <div className="max-h-[calc(100vh-15.5rem)] overflow-auto">
          <DataTable
            columns={columns}
            data={listProblems?.data || []}
            isLoading={isListProblemsLoading}
            isError={!!listProblemsError}
            onTryAgainIfError={refetchListProblems}
            paginationConfig={{
              currentPage: listProblems?.currentPage || 1,
              totalPages: listProblems?.lastPage || 1,
              perPage: listProblems?.perPage || 25,
              totalRecords: listProblems?.total || 1,
              onChangePage: goToPage,
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-between">
        <p>Selecionado(s): {quantitySelected}</p>
        <Button disabled={!quantitySelected}>Adicionar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
};
