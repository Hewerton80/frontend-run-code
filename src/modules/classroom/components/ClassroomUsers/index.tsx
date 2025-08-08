import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useClassroomUsers } from "./useClassroomUsers";
import { IUser, RoleUser, RoleUserEnum } from "@/modules/user/userTypets";
import {
  DataTable,
  IColmunDataTable,
} from "@/components/ui/dataDisplay/DataTable";
import { Button } from "@/components/ui/buttons/Button";
import { useMemo } from "react";
import { ClassroomTeacherFormDialog } from "../ClassromTeacherFormDialog";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Card } from "@/components/ui/cards/Card";
import { ClasrromUsersActionsTriggerButton } from "../ClasrromUsersActionsTriggerButton";
import { Tooltip } from "@/components/ui/overlay/Tooltip";

export function ClassroomUsers() {
  const {
    classroom,
    isLoadingClassroom,
    classroomUsers,
    isLoadingClassroomUsers,
    classroomUsersError,
    isOpenTeacherFormDialog,
    teacherIdToEdit,
    loggedUser,
    canAddTeacher,
    openTeacherFormDialog,
    closeTeacherFormDialog,
    refetchClassroomUsers,
    handleSetTeacherIdToEdit,
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
            {loggedUser?.uuid === user?.uuid && (
              <Badge variant="dark">Você</Badge>
            )}
          </div>
        ),
      },
      {
        field: "actions",
        label: "",
        onParse: (user) =>
          user?.role === RoleUser.TEACHER && (
            <div className="flex justify-end">
              <ClasrromUsersActionsTriggerButton
                onClickToEditUser={() => handleSetTeacherIdToEdit(user?.uuid!)}
              />
            </div>
          ),
      },
    ],
    [classroom, loggedUser, handleSetTeacherIdToEdit]
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
        <BackLink to="/home">Voltar para Home</BackLink>

        <div className="flex justify-between items-end gap-4">
          <Card.Title>🏫 {classroom?.name}</Card.Title>
          {loggedUser?.role === RoleUser.TEACHER && (
            <Tooltip
              align="start"
              textContent="Você não permissão para adicionar professores(as)"
              disableHoverableContent={canAddTeacher}
            >
              <span
                className={!canAddTeacher ? "cursor-not-allowed" : undefined}
              >
                <Button
                  disabled={!canAddTeacher}
                  onClick={openTeacherFormDialog}
                >
                  Adicionar professor(a)
                </Button>
              </span>
            </Tooltip>
          )}
        </div>
        <div className="flex flex-col">
          <DataTable
            columns={columns}
            data={classroomUsers?.data || []}
            isLoading={isLoadingClassroomUsers}
            isError={!!classroomUsersError}
            onTryAgainIfError={refetchClassroomUsers}
          />
        </div>
      </div>
      <ClassroomTeacherFormDialog
        isOpen={isOpenTeacherFormDialog}
        teacherId={teacherIdToEdit}
        onClose={closeTeacherFormDialog}
      />
    </>
  );
}
