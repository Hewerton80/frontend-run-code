import { IList } from "../../../listTypes";
import { memo, useMemo } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsThreeDots } from "react-icons/bs";
import { useFetchListOfExercises } from "@/modules/list/hooks/useFetchListOfExercises";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { FaPen } from "react-icons/fa";
import { useGetClassroomListStatus } from "../../../hooks/useGetClassroomListStatus";
import { ClasrromListStatus } from "../../ClasrromListStatus";
import { Alert } from "@/components/ui/feedback/Alert";
import { Ping, PingWrapper } from "@/components/ui/feedback/Ping";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { RoleUser } from "@/modules/user/userTypets";
import { ROUTES } from "@/routes/routes";
import { useGetCachedListOfClassroom } from "@/modules/list/hooks/useGetCachedListOfClassroom";
import { ClassroomListForm } from "../../ClassroomListFormDialog";

interface ClassroomListsTableRowAccordionContentProps {
  totalExercises: number;
  list: IList;
  role: RoleUser;
}

const ClassroomListsTableRowAccordionContent = memo(
  ({
    role,
    list,
    totalExercises,
  }: ClassroomListsTableRowAccordionContentProps) => {
    const {
      exerciseIdsOfList,
      errorExercises,
      isFetchingExercises,
      refetchListOfExercises,
    } = useFetchListOfExercises({
      classroomId: list?.classroom?.uuid!,
      listId: list?.id!,
    });

    return (
      <div className="p-2">
        {totalExercises === 0 ? (
          <Alert.Root>
            <Alert.Title>Não há exercícios cadastrados nesta lista</Alert.Title>
            {role === RoleUser.TEACHER && (
              <Alert.Description className="text-sm text-muted-foreground">
                Você pode adicionar exercícios clicando no botão de adicionar e
                remover exercícios.
              </Alert.Description>
            )}
          </Alert.Root>
        ) : (
          <>
            {errorExercises && (
              <FeedBackError onTryAgain={refetchListOfExercises} />
            )}
            <div className="grid grid-cols-3 gap-2 w-full border-none">
              {isFetchingExercises &&
                getRange(0, 5).map((index) => (
                  <Skeleton
                    key={`exercise-skeleton-${index}-${list.id}-${list.classroom?.uuid}`}
                    className="w-full h-26 rounded-lg"
                  />
                ))}

              {exerciseIdsOfList?.map((exerciseUuid) => (
                <ExerciseCard
                  key={`exercise-${exerciseUuid}-${list?.id}-${list?.classroom?.uuid}`}
                  exerciseId={exerciseUuid}
                  listId={list?.id!}
                  classroomId={list?.classroom?.uuid!}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

ClassroomListsTableRowAccordionContent.displayName =
  "ClassroomListsTableRowAccordionContent";
interface ClassroomListsTableRowProps {
  listId: number;
}

export const ClassroomListsTableRow = memo(
  ({ listId }: ClassroomListsTableRowProps) => {
    const { loggedUser } = useLoggedUser();

    const { cachedListOfClassroom } = useGetCachedListOfClassroom(listId);

    const { closed } = useGetClassroomListStatus(cachedListOfClassroom);

    const solved = useMemo(
      () => cachedListOfClassroom?.solved || 0,
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

    return (
      <>
        <DivTable.Row
          disableAccordion={closed}
          // onAccordionChange={() => handledOpenAccordion()}
          accordionContent={
            <ClassroomListsTableRowAccordionContent
              list={cachedListOfClassroom!}
              role={loggedUser?.role!}
              totalExercises={totalExercises}
            />
          }
          // accordionContent={
          //   <div className=" p-2">
          //     {totalExercises === 0 ? (
          //       <Alert.Root>
          //         <Alert.Title>
          //           Não há exercícios cadastrados nesta lista
          //         </Alert.Title>
          //         {loggedUser?.role === RoleUser.TEACHER && (
          //           <Alert.Description className="text-sm text-muted-foreground">
          //             Você pode adicionar exercícios clicando no botão de
          //             adicionar e remover exercícios.
          //           </Alert.Description>
          //         )}
          //       </Alert.Root>
          //     ) : (
          //       <>
          //         {errorExercises && (
          //           <FeedBackError onTryAgain={refetchListOfExercises} />
          //         )}
          //         <div className="grid grid-cols-3 gap-2 w-full border-none">
          //           {isFetchingExercises &&
          //             getRange(0, 5).map((index) => (
          //               <Skeleton
          //                 key={`exercise-skeleton-${index}`}
          //                 className="w-full h-26 rounded-lg"
          //               />
          //             ))}

          //           {exerciseIdsOfList?.map((exerciseUuid) => (
          //             <ExerciseCard
          //               key={`${exerciseUuid}-${cachedListOfClassroom?.id}-${cachedListOfClassroom?.classroom?.uuid}`}
          //               exerciseId={exerciseUuid}
          //               listId={cachedListOfClassroom?.id!}
          //               classroomId={cachedListOfClassroom?.classroom?.uuid!}
          //             />
          //           ))}
          //         </div>
          //       </>
          //     )}
          //   </div>
          // }
        >
          <DivTable.Data>
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1">{cachedListOfClassroom?.title}</p>
              <ClasrromListStatus list={cachedListOfClassroom} />
            </div>
          </DivTable.Data>
          {loggedUser?.role === RoleUser.STUDENT && (
            <DivTable.Data className="gap-2">
              <ProgressBar value={progress} />
              <span className="text-xs text-muted-foreground">
                {solved}/{totalExercises}
              </span>
            </DivTable.Data>
          )}
          {loggedUser?.role === RoleUser.TEACHER && (
            <DivTable.Data className="gap-2">{totalExercises}</DivTable.Data>
          )}
          <DivTable.Data className="justify-end pr-4 gap-2">
            <DivTable.AccordionTrigger />
            {loggedUser?.role === RoleUser.TEACHER && (
              <Dropdown.Root>
                <PingWrapper active={totalExercises === 0}>
                  <Dropdown.Trigger asChild>
                    <IconButton
                      variantStyle="dark-ghost"
                      icon={<BsThreeDots />}
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
                  <Dropdown.Item asChild className="gap-2">
                    <Link
                      to={ROUTES.CLASSROOM_LIST_UPDATE(
                        cachedListOfClassroom?.classroom?.uuid!,
                        cachedListOfClassroom?.id!,
                      )}
                    >
                      <RiArrowUpDownFill />
                      {totalExercises === 0 ? "Adicionar" : "Editar"} exercícios
                      {totalExercises === 0 && <Ping />}
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            )}
          </DivTable.Data>
        </DivTable.Row>
      </>
    );
  },
);

ClassroomListsTableRow.displayName = "ClassroomListsTableRow";
