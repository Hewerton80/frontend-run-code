import { ClassroomListsTableRow } from "./ClassroomListsTableRow";
import { useClassroomListsTable } from "./useClassroomListsTable";
import { ClassroomListForm } from "../ClassroomListFormDrawer";
import { Button } from "@/components/ui/buttons/Button";
import { Highlight } from "@/components/ui/feedback/Highlight";
import { BackLink } from "@/components/ui/navigation/BackLink";
import { ClasrromActionsTriggerButton } from "@/modules/classroom/components/ClasrromActionsTriggerButton";
import { EditExercisesOfList } from "@/modules/list/components/EditExercisesOfListDrawer";
import { ClassroomForm } from "@/modules/classroom/components/ClassroomFormDrawer";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";
import { CustomDataTable } from "@/components/ui/dataDisplay/CustomDataTable";
import { ClassroomHero } from "@/modules/classroom/components/ClassroomHero";
import {
  EmptyState,
  ScrollIllustration,
} from "@/components/ui/feedback/EmptyState";

export const ClassroomListsTable = () => {
  const {
    listIdsOfClassroom,
    canCreateList,
    classroom,
    loggedUser,
    isFetchingListsOfClassroom,
    listsOfClassroomError,
    refetchListsOfClassroom,
  } = useClassroomListsTable();

  return (
    <>
      <BackLink to={ROUTES.HOME}>Voltar para Home</BackLink>
      <div className="flex flex-col gap-4">
        <ClassroomHero classroomUuid={classroom?.uuid} />

        {loggedUser?.role === RoleUser.TEACHER && (
          <div className="flex justify-end gap-2">
            <Tooltip
              align="start"
              textContent="Você não tem permissão para criar listas nessa turma"
              disableHoverableContent={canCreateList}
            >
              <span
                className={!canCreateList ? "cursor-not-allowed" : undefined}
              >
                <Highlight
                  active={listIdsOfClassroom?.length === 0 && canCreateList}
                >
                  <ClassroomListForm.TriggerButton>
                    <Button disabled={!canCreateList}>Criar Lista</Button>
                  </ClassroomListForm.TriggerButton>
                </Highlight>
              </span>
            </Tooltip>
            <ClasrromActionsTriggerButton
              variantStyle="info"
              classroomId={classroom?.uuid}
            />
          </div>
        )}
      </div>

      <div className="flex overflow-auto">
        <CustomDataTable
          columns={[
            "Nome",
            ...(loggedUser?.role === RoleUser.STUDENT ? ["Progresso"] : []),
            ...(loggedUser?.role === RoleUser.TEACHER
              ? ["N° de exercícios"]
              : []),
            "",
          ]}
          errorMessage={
            listsOfClassroomError?.message
              ? listsOfClassroomError?.message ||
                "Ocorreu um erro ao buscar as listas da turma"
              : undefined
          }
          onRetry={refetchListsOfClassroom}
          isLoading={isFetchingListsOfClassroom}
          data={listIdsOfClassroom}
          idExtractor={(listId) => listId.toString()}
          renderEmptyState={() => (
            <EmptyState
              size="sm"
              illustration={<ScrollIllustration size={200} />}
              title="Nenhuma lista criada"
              message={
                RoleUser.TEACHER
                  ? "Crie uma lista para começar a adicionar exercícios."
                  : "Quando o professor publicar uma lista, ela aparecerá aqui."
              }
            />
          )}
          renderItem={({ item }) => (
            <ClassroomListsTableRow
              key={`${item}-list-exercise`}
              listId={item}
            />
          )}
        />
      </div>
      <ClassroomListForm.Drawer />
      <EditExercisesOfList.Drawer />
      <ClassroomForm.Drawer />
    </>
  );
};
