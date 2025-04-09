"use client";
import { Breadcrumbs } from "@/components/ui/dataDisplay";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { useClassroomUsers } from "./useClassroomUsers";
import { IUser, RoleUserEnum } from "@/modules/user/userTypets";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";

interface ClassroomUsersProps {}

export function ClassroomUsers() {
  const {
    classroom,
    errorClassroom,
    isLoadingClassroom,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
    refetchClassroom,
    refetchClassroomUsers,
  } = useClassroomUsers();

  const columns: IColmunDataTable<IUser>[] = [
    {
      field: "name",
      label: "Nome",
      onParse: (user) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={user?.avatarUrl}
            bgColor={user?.avatarBgColor}
            nameInities={user?.avatarInitials}
            size="sm"
          />
          <span className="line-clamp-1">{user?.name}</span>
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
      <Breadcrumbs
        isLoading={isLoadingClassroom}
        items={[
          { label: "🏠 Home", href: "/" },
          { label: classroom?.name || "-" },
          { label: "Participantes" },
        ]}
      />
      <div className="flex flex-col">
        <DataTable
          columns={columns}
          data={classroomUsers?.data || []}
          isLoading={isClassroomUsersLoading}
          isError={!!classroomUsersError}
          onTryAgainIfError={refetchClassroomUsers}
        />
      </div>
    </div>
  );
}
