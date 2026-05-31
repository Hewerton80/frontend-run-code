import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useClassroomUsers } from "./useClassroomUsers";
import { RoleUser, RoleUserEnum } from "@/modules/user/userTypets";
import { Button } from "@/components/ui/buttons/Button";
import { ClassroomTeacherForm } from "../ClassromTeacherFormDialog";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Card } from "@/components/ui/cards/Card";
import { ClasrromUsersActionsTriggerButton } from "../ClasrromUsersActionsTriggerButton";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { ROUTES } from "@/routes/routes";
import { DataTable } from "@/components/ui/DataTable";
import { Table } from "@/components/ui/dataDisplay/Table";

export function ClassroomUsers() {
  const {
    classroom,
    classroomUsers,
    isFetchingClassroomUsers,
    classroomUsersError,
    loggedUser,
    canAddTeacher,
    refetchClassroomUsers,
  } = useClassroomUsers();

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-8">
        <Breadcrumbs
          items={[
            { label: "🏠 Home", href: ROUTES.HOME },
            { label: classroom?.name || "-" },
            { label: "Participantes" },
          ]}
        />
        <BackLink to={ROUTES.HOME}>Voltar para Home</BackLink>

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
                <ClassroomTeacherForm.TriggerButton teacherId={null}>
                  <Button disabled={!canAddTeacher}>
                    Adicionar professor(a)
                  </Button>
                </ClassroomTeacherForm.TriggerButton>
              </span>
            </Tooltip>
          )}
        </div>
        <DataTable
          columns={["Nome", "Função", ""]}
          data={classroomUsers?.data}
          idExtractor={(user) => user?.uuid}
          errorMessage={
            classroomUsersError
              ? (classroomUsersError as any)?.data?.response?.message ||
                "Erro ao carregar participantes da turma"
              : undefined
          }
          isLoading={isFetchingClassroomUsers}
          onRetry={refetchClassroomUsers}
          numberOfSkeletonRows={10}
          renderItem={({ item: user }) => (
            <Table.Row>
              <Table.Data>
                <GroupedUserInfo user={user} />
              </Table.Data>
              <Table.Data>
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
              </Table.Data>
              <Table.Data>
                {user?.role === RoleUser.TEACHER && (
                  <div className="flex justify-end">
                    <ClasrromUsersActionsTriggerButton userUuid={user?.uuid!} />
                  </div>
                )}
              </Table.Data>
            </Table.Row>
          )}
        />
      </div>
      <ClassroomTeacherForm.Dialog />
    </>
  );
}
