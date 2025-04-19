"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { IListProblem } from "../../listProblemTypes";
import { useListListProblems } from "./useListProblems";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";

export const TableListProblems = () => {
  const {
    isListProblemsLoading,
    listProblems,
    listProblemsError,
    goToPage,
    refetchListProblems,
  } = useListListProblems();

  const columns: IColmunDataTable<IListProblem>[] = [
    {
      field: "title",
      label: "Título",
      onParse: (listProblems) => (
        <p className="line-clamp-1">{listProblems?.title}</p>
      ),
    },
    {
      field: "author",
      label: "Autor",
      onParse: (listProblems) => (
        <GroupedUserInfo user={listProblems?.author!} />
      ),
    },
    {
      field: "createdAt",
      label: "Criado em",
      onParse: (listProblems) => (
        <>{DateTime.format(listProblems?.createdAt!, "dd/MM/yyyy - HH:mm")}</>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isListProblemsLoading}
        items={[{ label: "📝 Listas" }]}
      />
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
  );
};
