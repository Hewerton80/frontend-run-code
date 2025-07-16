import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useListUserts } from "./useListUserts";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { IUser, RoleUserEnum } from "../../userTypets";
import { GroupedUserInfo } from "../GroupedUserInfo";
import { DateTime } from "@/utils/dateTime";

export const ListUsers = () => {
  const { refetchUsers, goToPage, users, isUsersLoading, usersError } =
    useListUserts();

  const columns: IColmunDataTable<IUser>[] = [
    {
      field: "name",
      label: "Nome",
      onParse: (user) => <GroupedUserInfo user={user!} />,
    },
    {
      field: "role",
      label: "Função",
      onParse: (user) => (
        <span className="line-clamp-1">
          {RoleUserEnum?.[user?.role] || "-"}
        </span>
      ),
    },
    {
      field: "createdAt",
      label: "Criado em",
      onParse: (user) => (
        <>{DateTime.format(user?.createdAt!, "dd/MM/yyyy - HH:mm")}</>
      ),
    },
  ];
  return (
    <div className="flex flex-col w-full gap-4 p-8">
      <Breadcrumbs items={[{ label: "Usuários", href: "/users" }]} />
      <DataTable
        columns={columns}
        data={users?.data || []}
        isLoading={isUsersLoading}
        isError={!!usersError}
        onTryAgainIfError={refetchUsers}
        paginationConfig={{
          currentPage: users?.currentPage || 1,
          totalPages: users?.lastPage || 1,
          perPage: users?.perPage || 25,
          totalRecords: users?.total || 1,
          onChangePage: goToPage,
        }}
      />
    </div>
  );
};
