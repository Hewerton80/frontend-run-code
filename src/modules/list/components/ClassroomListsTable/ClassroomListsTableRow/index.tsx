"use client";
import { IList } from "../../../listTypes";
import { useCallback, useState } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsThreeDots } from "react-icons/bs";
import { useGetExercisesByClassroomList } from "@/modules/exercise/hooks/useGetExercisesByClassroomList";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { FaGear } from "react-icons/fa6";
import { useGetClassroomListStatus } from "../../../hooks/useGetClassroomListStatus";
import { ClasrromListStatus } from "../../ClasrromListStatus";
import { Alert } from "@/components/ui/feedback/Alert";
import { Ping, PingWrapper } from "@/components/ui/feedback/Ping";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Highlight } from "@/components/ui/feedback/Highlight";

interface ClassroomListsTableRowProps {
  list: IList;
  onOpenEditModal?: () => void;
}

export const ClassroomListsTableRow = ({
  list,
  onOpenEditModal,
}: ClassroomListsTableRowProps) => {
  const { loggedUser } = useAuth();

  const { exercises, errorExercises, isLoadingExercises, refetchExercises } =
    useGetExercisesByClassroomList({
      classroomId: list?.classroom?.uuid as string,
      listId: list?.uuid as string,
    });

  const [alreadyAccordionOpened, setAlreadyAccordionOpened] = useState(false);

  const { closed } = useGetClassroomListStatus(list);

  const solved = list?.solved || 0;
  const totalExercises = list?.totalExercises || 0;

  const progress = solved ? Math.round((solved / totalExercises) * 100) : 0;

  const handledOpenAccordion = useCallback(() => {
    if (closed || alreadyAccordionOpened || totalExercises === 0) return;
    setAlreadyAccordionOpened(true);
    refetchExercises();
  }, [alreadyAccordionOpened, closed, totalExercises, refetchExercises]);

  return (
    <>
      <DivTable.Row
        disableAccordion={closed}
        onAccordionChange={() => handledOpenAccordion()}
        accordionContent={
          <div className=" p-2">
            {totalExercises === 0 || exercises?.length === 0 ? (
              <Alert.Root>
                <Alert.Title>
                  Não há exercícios cadastrados nesta lista
                </Alert.Title>
                {loggedUser?.role === 2 && (
                  <Alert.Description className="text-sm text-muted-foreground">
                    Você pode adicionar exercícios clicando no botão de
                    adicionar e remover exercícios.
                  </Alert.Description>
                )}
              </Alert.Root>
            ) : (
              <>
                {errorExercises && (
                  <FeedBackError onTryAgain={refetchExercises} />
                )}
                <div className="grid grid-cols-3 gap-2 w-full border-none">
                  {isLoadingExercises &&
                    getRange(0, 5).map((index) => (
                      <Skeleton
                        key={`exercise-skeleton-${index}`}
                        className="w-full h-26 rounded-lg"
                      />
                    ))}

                  {exercises?.map((exercise, index) => (
                    <ExerciseCard
                      key={`${exercise?.uuid}-${index}`}
                      data={{
                        ...exercise,
                        listExercise: list,
                        classroom: list?.classroom,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        }
      >
        <DivTable.Data>
          <div className="flex flex-col gap-1">
            <p className="line-clamp-1">{list?.title}</p>
            <ClasrromListStatus list={list} />
          </div>
        </DivTable.Data>
        {loggedUser?.role === 1 && (
          <DivTable.Data className="gap-2">
            <ProgressBar value={progress} />
            <span className="text-xs text-muted-foreground">
              {solved}/{totalExercises}
            </span>
          </DivTable.Data>
        )}
        {loggedUser?.role === 2 && (
          <DivTable.Data className="gap-2">{totalExercises}</DivTable.Data>
        )}
        <DivTable.Data className="justify-end pr-4 gap-2">
          <DivTable.AccordionTrigger />
          {loggedUser?.role === 2 && (
            <Dropdown.Root>
              <PingWrapper
                active={totalExercises === 0 || exercises?.length === 0}
              >
                <Dropdown.Trigger asChild>
                  <IconButton
                    variantStyle="dark-ghost"
                    icon={<BsThreeDots />}
                  />
                </Dropdown.Trigger>
              </PingWrapper>

              <Dropdown.Content>
                <Dropdown.Item onClick={onOpenEditModal} className="gap-2">
                  <FaGear />
                  Editar Lista
                </Dropdown.Item>
                <Dropdown.Item asChild className="gap-2">
                  <ProgressLink
                    href={`/classroom/${list?.classroom?.uuid}/lists/${list?.uuid}/update-exercises`}
                  >
                    <RiArrowUpDownFill />
                    Gerenciar exercícios
                    {(totalExercises === 0 || exercises?.length === 0) && (
                      <Ping />
                    )}
                  </ProgressLink>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          )}
        </DivTable.Data>
      </DivTable.Row>
    </>
  );
};
