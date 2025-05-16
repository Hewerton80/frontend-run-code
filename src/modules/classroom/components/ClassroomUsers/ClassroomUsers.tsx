"use client";
import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useClassroomUsers } from "./useClassroomUsers";
import { IUser, RoleUserEnum } from "@/modules/user/userTypets";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { Avatar } from "@/components/ui/dataDisplay/Avatar";
import { Button } from "@/components/ui/buttons/Button";
import { useMemo, useState } from "react";
import { ClassroomTeacherFormDialog } from "../ClassromTeacherForm";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { Badge } from "@/components/ui/dataDisplay/Badge";

export function ClassroomUsers() {
  const {
    classroom,
    errorClassroom,
    isLoadingClassroom,
    classroomUsers,
    isClassroomUsersLoading,
    classroomUsersError,
    isOpenTeacherFormDialog,
    openTeacherFormDialog,
    closeTeacherFormDialog,
    refetchClassroom,
    refetchClassroomUsers,
  } = useClassroomUsers();

  const columns = useMemo<IColmunDataTable<IUser>[]>(
    () => [
      {
        field: "name",
        label: "Nome",
        onParse: (user) => <GroupedUserInfo user={user} />,
      },
      {
        field: "role",
        label: "Função",
        onParse: (user) => (
          <div className="flex items-center gap-2">
            <span className="line-clamp-1">
              {RoleUserEnum?.[user?.role] || "-"}
            </span>
            {classroom?.author?.uuid === user?.uuid && (
              <Badge variant="dark">Autor(a)</Badge>
            )}
          </div>
        ),
      },
    ],
    [classroom]
  );

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          isLoading={isLoadingClassroom}
          items={[
            { label: "🏠 Home", href: "/home" },
            { label: classroom?.name || "-" },
            { label: "Participantes" },
          ]}
        />
        <div className="flex justify-end">
          <Button onClick={openTeacherFormDialog}>Adicionar professor</Button>
        </div>
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
      <ClassroomTeacherFormDialog
        isOpen={isOpenTeacherFormDialog}
        onClose={closeTeacherFormDialog}
      />
    </>
  );
}
