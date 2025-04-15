"use client";
import { Accordion } from "@/components/ui/dataDisplay/Accordion";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { ProblemCard } from "@/modules/problem/components/ProblemCard";
import { IProblem } from "@/modules/problem/problemTypes";
import { dalay } from "@/utils/dalay";
import { useState } from "react";
import { getRange } from "@/utils/getRange";
import { IListProblem } from "../../listProblemTypes";
import { format, isBefore, isAfter, startOfDay, endOfDay } from "date-fns";
import { useGetProblemsByClassroomList } from "@/modules/problem/hooks/useGetProblemsByClassroomList";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";

interface ListProblemAcoordionProps {
  data: IListProblem;
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

  const isDisabled = () => {
    const now = new Date();
    if (listProblem?.startDate && listProblem?.endDate) {
      const startDate = new Date(listProblem.startDate || "");
      const endDate = new Date(listProblem.endDate || "");
      const isStartDateValid = startDate.getTime() > 0;
      const isEndDateValid = endDate.getTime() > 0;
      if (isStartDateValid && isEndDateValid) {
        const start = startOfDay(startDate);
        const end = endOfDay(endDate);
        return isBefore(now, start) || isAfter(now, end);
      }
    }
    return false;
  };

  const openAccordion = (value: string) => {
    if (!value || alreadyOpened) return;
    setAlreadyOpened(true);
    refetchProblems();
  };

  return (
    <Accordion.Root
      disabled={isDisabled()}
      onValueChange={openAccordion}
      collapsible
      type="single"
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
              ? format(new Date(listProblem?.startDate), "dd/MM/yyyy")
              : "-"}{" "}
            -{" "}
            {listProblem?.endDate
              ? format(new Date(listProblem?.endDate), "dd/MM/yyyy")
              : "-"}{" "}
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
