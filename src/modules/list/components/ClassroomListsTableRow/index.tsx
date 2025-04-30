"use client";
import { IList } from "../../listTypes";
import { useCallback, useMemo, useState } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useGetExercisesByClassroomList } from "@/modules/exercise/hooks/useGetExercisesByClassroomList";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { PrimitiveAccordion } from "@/components/ui/dataDisplay/PrimitiveAccordion";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { FaGear } from "react-icons/fa6";
import { useGetClassroomListStatus } from "../../hooks/useGetClassroomListStatus";
import { ClasrromListStatus } from "../ClasrromListStatus";

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
    if (closed || alreadyAccordionOpened) return;
    setAlreadyAccordionOpened(true);
    refetchExercises();
  }, [alreadyAccordionOpened, closed, refetchExercises]);

  return (
    <PrimitiveAccordion.Root
      // value={openAccordion}
      onValueChange={handledOpenAccordion}
      disabled={closed}
      type="single"
      collapsible
      asChild
    >
      <PrimitiveAccordion.Item value={list?.uuid!}>
        <DivTable.Row
          className={twMerge(
            !closed && "hover:bg-muted/50",
            "duration-[.15s] ease-in-out transition-colors"
          )}
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
            {!closed && (
              <PrimitiveAccordion.Trigger
                className="[&[data-state=open]_.arrow]:rotate-180"
                asChild
              >
                <IconButton
                  variantStyle="dark-ghost"
                  icon={
                    <BsChevronDown
                      className={twMerge(
                        "arrow size-4 transition-transform duration-200"
                      )}
                    />
                  }
                />
              </PrimitiveAccordion.Trigger>
            )}
            {loggedUser?.role === 2 && (
              <Dropdown.Root>
                <Dropdown.Trigger
                  // disabled={!!errorClassroom || !classroom}
                  asChild
                >
                  <IconButton
                    variantStyle="dark-ghost"
                    icon={<BsThreeDots />}
                  />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onClick={onOpenEditModal} className="gap-2">
                    <FaGear />
                    Configurar
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            )}
          </DivTable.Data>
        </DivTable.Row>
        {/* </PrimitiveAccordion.Trigger> */}
        <PrimitiveAccordion.Content>
          {errorExercises && <FeedBackError onTryAgain={refetchExercises} />}
          <div className="grid grid-cols-3 gap-4 w-full border-none p-2">
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
        </PrimitiveAccordion.Content>
      </PrimitiveAccordion.Item>
    </PrimitiveAccordion.Root>
  );
};
