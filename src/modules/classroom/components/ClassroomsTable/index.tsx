"use client";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { useClassroomsTable } from "./useClassroomTable";
import { IClassroom, StatusClassroomEnum } from "../../classroomType";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";

export const ClassroomsTable = () => {
  const {
    refetchClassrooms,
    classrooms,
    isClassroomsLoading,
    classroomsError,
    goToPage,
  } = useClassroomsTable();

  const columns: IColmunDataTable<IClassroom>[] = [
    {
      field: "name",
      label: "Nome",
      onParse: (classroom) => <p className="line-clamp-1">{classroom?.name}</p>,
    },
    {
      field: "author",
      label: "Autor",
      onParse: (classroom) => <GroupedUserInfo user={classroom?.author!} />,
    },
    {
      field: "status",
      label: "Status",
      onParse: (classroom) => StatusClassroomEnum?.[classroom?.status!] || "-",
    },
    {
      field: "createdAt",
      label: "Criado em",
      onParse: (classroom) => (
        <>{DateTime.format(classroom?.createdAt!, "dd/MM/yyyy - HH:mm")}</>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full p-8">
      <Breadcrumbs
        isLoading={isClassroomsLoading}
        items={[{ label: "Turmas" }]}
      />
      <DataTable
        columns={columns}
        data={classrooms?.data || []}
        isLoading={isClassroomsLoading}
        isError={!!classroomsError}
        onTryAgainIfError={refetchClassrooms}
        paginationConfig={{
          currentPage: classrooms?.currentPage || 1,
          totalPages: classrooms?.lastPage || 1,
          perPage: classrooms?.perPage || 25,
          totalRecords: classrooms?.total || 1,
          onChangePage: goToPage,
        }}
      />
    </div>
  );
};
