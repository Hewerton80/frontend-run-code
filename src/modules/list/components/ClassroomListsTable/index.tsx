"use client";
import { Table } from "@/components/ui/dataDisplay/Table";
import { IListProblem } from "../../listProblemTypes";
import { useEffect, useMemo, useState } from "react";
import { TableSkeleton } from "@/components/ui/feedback/TableSkeleton";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { DateTime } from "@/utils/dateTime";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { GroupedUserInfo } from "@/modules/user/components/GroupedUserInfo";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsChevronDown } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useGetProblemsByClassroomList } from "@/modules/problem/hooks/useGetProblemsByClassroomList";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Tooltip } from "@/components/ui/overlay/Tooltip";
import ProgressLink from "@/components/ui/navigation/ProgressLink/ProgressLink";
import { Button } from "@/components/ui/buttons/Button";
import { ProblemCard } from "@/modules/problem/components/ProblemCard";

interface ClassroomListsTableProps {
  data?: IListProblem[];
  isLoading?: boolean;
  error?: string;
  onTryAgainIfError?: () => void;
}

interface ClassroomListsTableRowProps {
  list: IListProblem;
}

const problemSolveStatusEmojis: Record<number, { icon: string; name: string }> =
  {
    1: { icon: "✅", name: "Resolvida" },
    2: { icon: "❌", name: "Errada" },
    3: { icon: "🕒", name: "Aguardando submissão" },
  };

const ClassroomListsTableRow = ({ list }: ClassroomListsTableRowProps) => {
  const { problems, errorProblems, isLoadingProblems, refetchProblems } =
    useGetProblemsByClassroomList({
      classroomId: list?.classroom?.uuid as string,
      listId: list?.uuid as string,
    });

  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(false);

  const startDate = list.startDate;
  const endDate = list.endDate;

  const solved = list?.solved || 0;
  const totalProblems = list?.totalProblems || 0;

  const progress = solved ? Math.round((solved / totalProblems) * 100) : 0;

  const alreadyStarted = () => {
    const now = new Date();
    if (
      startDate &&
      DateTime.isValid(startDate) &&
      endDate &&
      DateTime.isValid(endDate)
    ) {
      return DateTime.isBetween(
        DateTime.startOfDay(new Date(startDate)),
        DateTime.endOfDay(new Date(endDate)),
        now
      );
    }
    return false;
  };

  const didNotStart = () => {
    const now = new Date();
    if (startDate && DateTime.isValid(startDate)) {
      return DateTime.isBefore(now, DateTime.startOfDay(new Date(startDate)));
    }
    return false;
  };

  const alreadyFinished = () => {
    const now = new Date();
    if (endDate && DateTime.isValid(endDate)) {
      return DateTime.isAfter(now, DateTime.endOfDay(endDate));
    }
    return false;
  };

  const isDisabled = didNotStart() || alreadyFinished();

  useEffect(() => {
    if (alreadyOpened || isDisabled || !openAccordion) return;
    setAlreadyOpened(true);
    refetchProblems();
  }, [openAccordion, isDisabled, alreadyOpened, refetchProblems]);

  return (
    <>
      <Table.Row
        onClick={() => !isDisabled && setOpenAccordion(!openAccordion)}
        role="button"
        className={twMerge(
          !isDisabled && "hover:bg-muted/50 cursor-pointer",
          "duration-[.15s] ease-in-out transition-colors"
        )}
      >
        <Table.Data>
          <div className="flex flex-col gap-1">
            <p className="line-clamp-1">{list?.title}</p>
            <div className="flex items-center gap-2">
              {alreadyStarted() && (
                <>
                  <Badge variant="success">Aberta</Badge>
                  <span className="text-xs text-muted-foreground">
                    Finaliza em {DateTime.format(startDate!, "dd MMM, yyyy")}
                  </span>
                </>
              )}
              {didNotStart() && (
                <>
                  <Badge variant="warning">Não iniciada</Badge>
                  <span className="text-xs text-muted-foreground">
                    Começa em {DateTime.format(startDate!, "dd MMM, yyyy")}
                  </span>
                </>
              )}
              {alreadyFinished() && (
                <>
                  <Badge variant="dark">Finalizada</Badge>
                  <span className="text-xs text-muted-foreground">
                    Finalizada em {DateTime.format(endDate!, "dd MMM, yyyy")}
                  </span>
                </>
              )}
            </div>
          </div>
        </Table.Data>
        <Table.Data>
          <div className="flex items-center gap-2">
            <ProgressBar value={progress} />
            <span className="text-xs text-muted-foreground">
              {solved}/{totalProblems}
            </span>
          </div>
        </Table.Data>

        {/* <Table.Data>
        <GroupedUserInfo user={list?.author!} />
      </Table.Data> */}
        <Table.Data>
          <div className="flex justify-end pr-4">
            <BsChevronDown
              className={twMerge(
                "size-4 ml-4 shrink-0 text-muted-foreground transition-transform duration-200",
                openAccordion && "rotate-180"
              )}
            />
          </div>
        </Table.Data>
      </Table.Row>

      {openAccordion && (
        <>
          {/* <Table.Row className="flex bg-blue-500">
            <Table.Data></Table.Data>
          </Table.Row> */}
          {isLoadingProblems &&
            getRange(0, 4).map((index) => (
              <Table.Row
                className={twMerge(
                  //   "bg-linear-to-r from-blue-500 to-blue-700",
                  //   "hover:from-blue-500/80 hover:to-blue-700/80",
                  "duration-300 ease-in-out transition"
                )}
                key={`skeleton-row-${index}-list`}
              >
                {getRange(0, 5).map((index) => (
                  <Table.Data key={`skeleton-data-${index}-list`}>
                    <Skeleton className="h-4 max-w-[146px] w-full" />
                  </Table.Data>
                ))}
              </Table.Row>
            ))}
          <Table.Row
            className={twMerge(
              "grid grid-cols-3 gap-4 w-full border-none p-4",
              // "bg-linear-to-r from-blue-500 to-blue-700",
              // "hover:from-blue-500/80 hover:to-blue-700/80",
              "duration-300 ease-in-out transition"
            )}
          >
            {problems?.map((problem, index) => (
              <Table.Data
                key={`${problem?.uuid}-${index}`}
                className="flex w-full border-none p-0"
              >
                <ProblemCard
                  data={{
                    ...problem,
                    listProblem: list,
                    classroom: list?.classroom,
                  }}
                />
              </Table.Data>
              //    <Table.Data>
              //     <p className="line-clamp-1">{problem?.title}</p>
              //   </Table.Data>
              //   <Table.Data>
              //     <Tooltip
              //       //   align="start"
              //       textContent={
              //         <div className="flex flex-col gap-1">
              //           <p className="font-bold">
              //             {problemSolveStatusEmojis?.[problem?.status!]?.name}{" "}
              //             {problemSolveStatusEmojis?.[problem?.status!]?.icon}
              //           </p>
              //         </div>
              //       }
              //     >
              //       <span>
              //         {problemSolveStatusEmojis?.[problem?.status!]?.icon}
              //       </span>
              //     </Tooltip>
              //   </Table.Data>
              //   <Table.Data>
              //     <div className="flex justify-end">
              //       <Button asChild variantStyle="info">
              //         <ProgressLink
              //           href={`/classroom/${problem?.classroom?.uuid}/lists/${problem?.listProblem?.uuid}/problem/${problem?.uuid}`}
              //         >
              //           Acessar
              //         </ProgressLink>
              //       </Button>
              //     </div>
              //   </Table.Data>
            ))}
          </Table.Row>
        </>
      )}
    </>
  );
};

export const ClassroomListsTable = ({
  isLoading,
  data,
  error,
  onTryAgainIfError,
}: ClassroomListsTableProps) => {
  const handledDataTable = useMemo(() => {
    if (error) {
      return <FeedBackError onTryAgain={onTryAgainIfError} />;
    }

    if (isLoading) {
      return (
        <>
          {getRange(0, 8).map((index) => (
            <Table.Row key={`skeleton-row-${index}-list`}>
              {getRange(0, 5).map((index) => (
                <Table.Data key={`skeleton-data-${index}-list`}>
                  <Skeleton className="h-4 max-w-[146px] w-full" />
                </Table.Data>
              ))}
            </Table.Row>
          ))}
        </>
      );
    }

    return (
      <>
        {data?.map((list) => (
          <ClassroomListsTableRow
            key={`data-${list?.uuid}-list-problem`}
            list={list}
          />
        ))}
      </>
    );
  }, [data, error, isLoading, onTryAgainIfError]);

  return (
    <Table.Container>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Progresso</Table.HeadCell>
            {/* <Table.HeadCell>Autor</Table.HeadCell> */}
            <Table.HeadCell></Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{handledDataTable}</Table.Body>
      </Table>
      {data?.length === 0 && (
        <div className="flex justify-center items-center p-8">
          <h5 className="text-2xl text-gray-70">Tabela vazia</h5>
        </div>
      )}
    </Table.Container>
  );
};
