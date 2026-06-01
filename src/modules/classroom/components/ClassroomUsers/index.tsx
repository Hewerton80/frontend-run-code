import { Breadcrumbs } from "@/components/ui/dataDisplay/Breadcrumb";
import { useClassroomUsers } from "./useClassroomUsers";
import { RoleUser } from "@/modules/user/userTypets";
import { Button } from "@/components/ui/buttons/Button";
import { ClassroomTeacherForm } from "./ClassromTeacherFormDialog";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { Card } from "@/components/ui/cards/Card";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { ROUTES } from "@/routes/routes";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { ClassroomUsersTableRow } from "./ClassroomUsersTableRow";

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
        <CustomDataTable
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
            <ClassroomUsersTableRow userUuid={user?.uuid!} />
          )}
        />
      </div>
      <ClassroomTeacherForm.Dialog />
    </>
  );
}
