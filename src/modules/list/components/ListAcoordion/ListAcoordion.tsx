"use client";
import { Accordion } from "@/components/ui/dataDisplay/Accordion";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ExerciseCard } from "@/modules/exercise/components/ExerciseCard";
import { useState } from "react";
import { getRange } from "@/utils/getRange";
import { IList } from "../../listTypes";
import { useGetExercisesByClassroomList } from "@/modules/exercise/hooks/useGetExercisesByClassroomList";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { DateTime } from "@/utils/dateTime";

interface ListExerciseAcoordionProps {
  data: IList;
}

export function ListExerciseAcoordion({
  data: listExercise,
}: ListExerciseAcoordionProps) {
  const [alreadyOpened, setAlreadyOpened] = useState(false);

  const { exercises, errorExercises, isLoadingExercises, refetchExercises } =
    useGetExercisesByClassroomList({
      classroomId: listExercise?.classroom?.uuid as string,
      listId: listExercise?.uuid as string,
    });
  const solved = listExercise?.solved || 0;
  const totalExercises = listExercise?.totalExercises || 0;

  const progress = solved ? Math.round((solved / totalExercises) * 100) : 0;

  const didNotStart = () => {
    const now = new Date();
    const startDate = listExercise.startDate;
    if (startDate && DateTime.isValid(startDate)) {
      return DateTime.isBefore(now, DateTime.startOfDay(new Date(startDate)));
    }
    return false;
  };

  const alreadyFinished = () => {
    const now = new Date();
    const endDate = listExercise.endDate;
    if (endDate && DateTime.isValid(endDate)) {
      return DateTime.isAfter(now, DateTime.endOfDay(endDate));
    }
    return false;
  };

  const isDisabled = didNotStart() || alreadyFinished();

  const openAccordion = (value: string) => {
    if (!value || alreadyOpened) return;
    setAlreadyOpened(true);
    refetchExercises();
  };

  return (
    <Accordion.Root
      disabled={isDisabled}
      onValueChange={openAccordion}
      collapsible
      type="single"
      className="mt-4"
    >
      <Accordion.Item
        className="line-clamp-1"
        value={listExercise?.uuid as string}
      >
        <div className="flex flex-col w-full pb-3 gap-2">
          <Accordion.Trigger className="pb-0">
            {listExercise?.title}
          </Accordion.Trigger>
          <span className="text-xs text-muted-foreground">
            {listExercise?.startDate
              ? DateTime.format(listExercise?.startDate, "dd/MM/yyyy")
              : "-"}{" "}
            -{" "}
            {listExercise?.endDate
              ? DateTime.format(listExercise?.endDate, "dd/MM/yyyy")
              : "-"}{" "}
            {didNotStart() && (
              <Badge variant="warning" className="ml-2">
                Não iniciado
              </Badge>
            )}
            {alreadyFinished() && (
              <Badge variant="warning" className="ml-2">
                Finalizado
              </Badge>
            )}
          </span>
          <div className="flex items-center gap-2">
            <ProgressBar value={progress} />
            <span className="text-sm">
              {solved}/{totalExercises}
            </span>
          </div>
        </div>
        <Accordion.Content>
          {errorExercises && <FeedBackError onTryAgain={refetchExercises} />}
          <div className="grid grid-cols-3 gap-4">
            {isLoadingExercises &&
              getRange(0, 5).map((index) => (
                <Skeleton
                  key={`exercise-skeleton-${index}`}
                  className="w-full h-26 rounded-lg"
                />
              ))}
            {exercises?.map((exercise, index) => (
              <ExerciseCard
                key={`${exercise?.title}-${index}`}
                data={{
                  ...exercise,
                  listExercise,
                  classroom: listExercise?.classroom,
                }}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
