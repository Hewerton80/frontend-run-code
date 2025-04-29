"use client";
import { Accordion } from "@/components/ui/dataDisplay/Accordion";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ProblemCard } from "@/modules/problem/components/ProblemCard";
import { useState } from "react";
import { getRange } from "@/utils/getRange";
import { IList } from "../../listProblemTypes";
import { useGetProblemsByClassroomList } from "@/modules/problem/hooks/useGetProblemsByClassroomList";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { DateTime } from "@/utils/dateTime";

interface ListProblemAcoordionProps {
  data: IList;
}

export function ListProblemAcoordion({
  data: listProblem,
}: ListProblemAcoordionProps) {
  const [alreadyOpened, setAlreadyOpened] = useState(false);

  const { problems, errorProblems, isLoadingProblems, refetchProblems } =
    useGetProblemsByClassroomList({
      classroomId: listProblem?.classroom?.uuid as string,
      listId: listProblem?.uuid as string,
    });
  const solved = listProblem?.solved || 0;
  const totalProblems = listProblem?.totalProblems || 0;

  const progress = solved ? Math.round((solved / totalProblems) * 100) : 0;

  const didNotStart = () => {
    const now = new Date();
    const startDate = listProblem.startDate;
    if (startDate && DateTime.isValid(startDate)) {
      return DateTime.isBefore(now, DateTime.startOfDay(new Date(startDate)));
    }
    return false;
  };

  const alreadyFinished = () => {
    const now = new Date();
    const endDate = listProblem.endDate;
    if (endDate && DateTime.isValid(endDate)) {
      return DateTime.isAfter(now, DateTime.endOfDay(endDate));
    }
    return false;
  };

  const isDisabled = didNotStart() || alreadyFinished();

  const openAccordion = (value: string) => {
    if (!value || alreadyOpened) return;
    setAlreadyOpened(true);
    refetchProblems();
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
        value={listProblem?.uuid as string}
      >
        <div className="flex flex-col w-full pb-3 gap-2">
          <Accordion.Trigger className="pb-0">
            {listProblem?.title}
          </Accordion.Trigger>
          <span className="text-xs text-muted-foreground">
            {listProblem?.startDate
              ? DateTime.format(listProblem?.startDate, "dd/MM/yyyy")
              : "-"}{" "}
            -{" "}
            {listProblem?.endDate
              ? DateTime.format(listProblem?.endDate, "dd/MM/yyyy")
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
              {solved}/{totalProblems}
            </span>
          </div>
        </div>
        <Accordion.Content>
          {errorProblems && <FeedBackError onTryAgain={refetchProblems} />}
          <div className="grid grid-cols-3 gap-4">
            {isLoadingProblems &&
              getRange(0, 5).map((index) => (
                <Skeleton
                  key={`problem-skeleton-${index}`}
                  className="w-full h-26 rounded-lg"
                />
              ))}
            {problems?.map((problem, index) => (
              <ProblemCard
                key={`${problem?.title}-${index}`}
                data={{
                  ...problem,
                  listProblem,
                  classroom: listProblem?.classroom,
                }}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
