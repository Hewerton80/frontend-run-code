import { Fragment, memo, useId, useMemo, useState } from "react";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { FaPen } from "react-icons/fa";
import { useGetClassroomListStatus } from "../../../hooks/useGetClassroomListStatus";
import { ClasrromListStatus } from "../../ClasrromListStatus";
import { Ping, PingWrapper } from "@/components/ui/feedback/Ping";
import { RiArrowUpDownFill } from "react-icons/ri";
import { RoleUser } from "@/modules/user/userTypets";
import { useGetCachedListOfClassroom } from "@/modules/list/hooks/useGetCachedListOfClassroom";
import { EditExercisesOfList } from "@/modules/list/components/EditExercisesOfListDrawer";
import { ClassroomListForm } from "../../ClassroomListFormDrawer";
import { Table } from "@/components/ui/dataDisplay/Table";
import { cn } from "@/utils/cn";
import { PrimitiveAccordion } from "@/components/ui/dataDisplay/PrimitiveAccordion";
import { ClassroomListsTableRowAccordionContent } from "./ClassroomListsTableRowAccordionContent";

interface ClassroomListsTableRowProps {
  listId: number;
}

export const ClassroomListsTableRow = memo(
  ({ listId }: ClassroomListsTableRowProps) => {
    const { loggedUser } = useLoggedUser();
    const reactId = useId();
    const [openAccordion, setOpenAccordion] = useState(false);

    const { cachedListOfClassroom } = useGetCachedListOfClassroom(listId);

    const { closed } = useGetClassroomListStatus({
      startDate: cachedListOfClassroom?.startDate,
      endDate: cachedListOfClassroom?.endDate,
      status: cachedListOfClassroom?.status!,
    });

    const solved = useMemo(
      () =>
        Object.values(cachedListOfClassroom?.solvedsMap || {}).filter(Boolean)
          .length,
      [cachedListOfClassroom],
    );
    const totalExercises = useMemo(
      () => cachedListOfClassroom?.totalExercises || 0,
      [cachedListOfClassroom],
    );
    const progress = useMemo(
      () =>
        solved && totalExercises
          ? Math.round((solved / totalExercises) * 100)
          : 0,
      [solved, totalExercises],
    );

    const handledDatas = useMemo(() => {
      const data = [
        <div className="flex flex-col gap-1">
          <p className="line-clamp-1">{cachedListOfClassroom?.title}</p>
          <ClasrromListStatus
            startDate={cachedListOfClassroom?.startDate}
            endDate={cachedListOfClassroom?.endDate}
            status={cachedListOfClassroom?.status!}
          />
        </div>,
        loggedUser?.role === RoleUser.STUDENT ? (
          <Table.Data>
            <div className="flex flex-1 items-center gap-2">
              <ProgressBar value={progress} />
              <span className="text-xs text-muted-foreground">
                {solved}/{totalExercises}
              </span>
            </div>
          </Table.Data>
        ) : null,
        loggedUser?.role === RoleUser.TEACHER && <>{totalExercises}</>,
        // TODO criar um componente Actions
        <div className="flex flex-1 items-center gap-2 justify-end pr-2">
          <IconButton
            variantStyle="dark-ghost"
            className={cn(openAccordion && "[&_.arrow]:rotate-180")}
            onClick={() => {
              setOpenAccordion((prev) => {
                console.log("!prev", !prev);
                return !prev;
              });
            }}
            icon={
              <BsChevronDown
                className={cn("arrow size-4 transition-transform duration-200")}
              />
            }
          />
          {loggedUser?.role === RoleUser.TEACHER && (
            <Dropdown.Root>
              <PingWrapper active={totalExercises === 0}>
                <Dropdown.Trigger asChild>
                  <IconButton
                    variantStyle="dark-ghost"
                    icon={<BsThreeDots className="text-muted-foreground" />}
                  />
                </Dropdown.Trigger>
              </PingWrapper>

              <Dropdown.Content>
                <ClassroomListForm.TriggerButton
                  listId={cachedListOfClassroom?.id}
                >
                  <Dropdown.Item className="gap-2">
                    <FaPen />
                    Visualizar Liata
                  </Dropdown.Item>
                </ClassroomListForm.TriggerButton>
                <EditExercisesOfList.TriggerButton
                  listId={cachedListOfClassroom?.id}
                  classroomId={cachedListOfClassroom?.classroom?.uuid}
                >
                  <Dropdown.Item className="gap-2">
                    <RiArrowUpDownFill />
                    {totalExercises === 0 ? "Adicionar" : "Editar"} exercícios
                    {totalExercises === 0 && <Ping />}
                  </Dropdown.Item>
                </EditExercisesOfList.TriggerButton>
              </Dropdown.Content>
            </Dropdown.Root>
          )}
        </div>,
      ];
      return data.filter(Boolean) as React.ReactNode[];
    }, [
      openAccordion,
      cachedListOfClassroom,
      loggedUser?.role,
      solved,
      totalExercises,
      progress,
    ]);

    return (
      <Fragment>
        <Table.Row>
          {handledDatas.map((data, index) => (
            <Table.Data key={`data-${index}-${reactId}`}>{data}</Table.Data>
          ))}
        </Table.Row>

        <PrimitiveAccordion.Root
          type="single"
          asChild
          collapsible
          disabled={closed}
          onValueChange={(open) => setOpenAccordion(Boolean(open))}
          value={openAccordion ? reactId : ""}
        >
          <PrimitiveAccordion.Item value={reactId} asChild>
            <Table.Row>
              <Table.Data
                className="p-0 border-0!"
                colSpan={handledDatas.length}
              >
                <PrimitiveAccordion.Content>
                  <ClassroomListsTableRowAccordionContent
                    list={cachedListOfClassroom!}
                    role={loggedUser?.role!}
                    totalExercises={totalExercises}
                  />
                </PrimitiveAccordion.Content>
              </Table.Data>
            </Table.Row>
          </PrimitiveAccordion.Item>
        </PrimitiveAccordion.Root>
      </Fragment>
    );
  },
);

ClassroomListsTableRow.displayName = "ClassroomListsTableRow";
