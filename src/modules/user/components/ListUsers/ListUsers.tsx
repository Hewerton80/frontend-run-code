"use client";

import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { useListUserts } from "./useListUserts";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { IUser, RoleUserEnum } from "../../userTypets";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";

export const ListUsers = () => {
  const { refetchUsers, goToPage, users, isUsersLoading, usersError } =
    useListUserts();

  const columns: IColmunDataTable<IUser>[] = [
    {
      field: "name",
      label: "Nome",
      onParse: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={
              user?.avatarUrl
                ? `/avatar/${(user?.avatarUrl).padStart(2, "0")}.jpeg`
                : ""
            }
            bgColor={user?.avatarBgColor}
            color={user?.avatarFontColor}
            nameInities={user?.avatarInitials}
            size="sm"
          />
          <span className="line-clamp-1">
            {user?.name} {user?.surname}
          </span>
        </div>
      ),
    },
    {
      field: "email",
      label: "Email",
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
