"use client";
import { Button } from "@/components/ui/buttons/Button";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { IList } from "../../listTypes";
import { useTableLists } from "./useTableLists";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";

export const ListsTable = () => {
  const {
    isListExercisesLoading,
    listExercises,
    listExercisesError,
    goToPage,
    refetchListExercises,
  } = useTableLists();

  const columns: IColmunDataTable<IList>[] = [
    {
      field: "title",
      label: "Título",
      onParse: (listExercises) => (
        <p className="line-clamp-1">{listExercises?.title}</p>
      ),
    },
    {
      field: "author",
      label: "Autor",
      onParse: (listExercises) => (
        <GroupedUserInfo user={listExercises?.author!} />
      ),
    },
    {
      field: "createdAt",
      label: "Criado em",
      onParse: (listExercises) => (
        <>{DateTime.format(listExercises?.createdAt!, "dd/MM/yyyy - HH:mm")}</>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isListExercisesLoading}
        items={[{ label: "📝 Listas" }]}
      />
      <div>
        <DataTable
          columns={columns}
          data={listExercises?.data || []}
          isLoading={isListExercisesLoading}
          isError={!!listExercisesError}
          onTryAgainIfError={refetchListExercises}
          paginationConfig={{
            currentPage: listExercises?.currentPage || 1,
            totalPages: listExercises?.lastPage || 1,
            perPage: listExercises?.perPage || 25,
            totalRecords: listExercises?.total || 1,
            onChangePage: goToPage,
          }}
        />
      </div>
    </div>
  );
};
