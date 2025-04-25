"use client";
import { IListProblem } from "../../listProblemTypes";
import { useCallback, useMemo, useState } from "react";
import { getRange } from "@/utils/getRange";
import { Skeleton } from "@/components/ui/feedback/Skeleton";
import { FeedBackError } from "@/components/ui/feedback/FeedBackError";
import { DateTime } from "@/utils/dateTime";
import { Badge } from "@/components/ui/dataDisplay/Badge";
import { ProgressBar } from "@/components/ui/feedback/ProgressBar";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useGetProblemsByClassroomList } from "@/modules/problem/hooks/useGetProblemsByClassroomList";
import { ProblemCard } from "@/modules/problem/components/ProblemCard";
import { DivTable } from "@/components/ui/dataDisplay/DivTable";
import { PrimitiveAccordion } from "@/components/ui/dataDisplay/PrimitiveAccordion";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconButton } from "@/components/ui/buttons/IconButton";
import { Dropdown } from "@/components/ui/overlay/Dropdown/Dropdown";
import { Dialog } from "@/components/ui/overlay/Dialog";
import { FaGear } from "react-icons/fa6";
import { Input } from "@/components/ui/forms/inputs/Input";
import { Switch } from "@/components/ui/forms/Switch";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { Button } from "@/components/ui/buttons/Button";

interface ClassroomListsTableProps {
  data?: IListProblem[];
  isLoading?: boolean;
  error?: string;
  onTryAgainIfError?: () => void;
}

interface ClassroomListsTableRowProps {
  list: IListProblem;
  onOpenEditModal?: () => void;
}

const ClassroomListsTableRow = ({
  list,
  onOpenEditModal,
}: ClassroomListsTableRowProps) => {
  const { loggedUser } = useAuth();
  const { problems, errorProblems, isLoadingProblems, refetchProblems } =
    useGetProblemsByClassroomList({
      classroomId: list?.classroom?.uuid as string,
      listId: list?.uuid as string,
    });

  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");

  const startDate = list.startDate;
  const endDate = list.endDate;

  const solved = list?.solved || 0;
  const totalProblems = list?.totalProblems || 0;

  const progress = solved ? Math.round((solved / totalProblems) * 100) : 0;

  const alreadyStarted = useMemo(() => {
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
  }, [startDate, endDate]);

  const didNotStart = useMemo(() => {
    const now = new Date();
    if (startDate && DateTime.isValid(startDate)) {
      return DateTime.isBefore(now, DateTime.startOfDay(new Date(startDate)));
    }
    return false;
  }, [startDate]);

  const alreadyFinished = useMemo(() => {
    const now = new Date();
    if (endDate && DateTime.isValid(endDate)) {
      return DateTime.isAfter(now, DateTime.endOfDay(endDate));
    }
    return false;
  }, [endDate]);

  const isDisabled = useMemo(() => {
    if (loggedUser?.role === 2) {
      return false;
    }
    return didNotStart || alreadyFinished || list?.status === 1;
  }, [didNotStart, alreadyFinished, list, loggedUser]);

  const handledOpenAccordion = useCallback(
    (value: string) => {
      if (isDisabled) return;
      setOpenAccordion(value);
      if (alreadyOpened) {
        return;
      }
      setAlreadyOpened(true);
      refetchProblems();
    },
    [alreadyOpened, isDisabled, refetchProblems]
  );

  const badgeStatusInfoElement = useMemo(() => {
    if (list?.status === 1) {
      return (
        <>
          <Badge variant="info">Não visível para os alunos</Badge>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {[
              startDate
                ? `Começa em ${DateTime.format(startDate!, "dd MMM, yyyy")}`
                : undefined,
              endDate
                ? `Finaliza em ${DateTime.format(endDate!, "dd MMM, yyyy")}`
                : undefined,
              ,
            ]
              .filter((value) => !!value)
              .join(" | ")}
          </span>
        </>
      );
    }
    if (!startDate && !startDate) {
      return (
        <>
          <Badge variant="success">Aberta</Badge>
        </>
      );
    }
    if (alreadyStarted) {
      return (
        <>
          <Badge variant="success">Aberta</Badge>
          <span className="text-xs text-muted-foreground">
            Finaliza em {DateTime.format(startDate!, "dd MMM, yyyy")}
          </span>
        </>
      );
    }
    if (didNotStart) {
      return (
        <>
          <Badge variant="warning">Não iniciada</Badge>
          <span className="text-xs text-muted-foreground">
            Começa em {DateTime.format(startDate!, "dd MMM, yyyy")}
          </span>
        </>
      );
    }
    if (alreadyFinished) {
      return (
        <>
          <Badge variant="dark">Finalizada</Badge>
          <span className="text-xs text-muted-foreground">
            Finalizada em {DateTime.format(endDate!, "dd MMM, yyyy")}
          </span>
        </>
      );
    }
  }, [alreadyStarted, startDate, didNotStart, endDate, alreadyFinished, list]);

  return (
    <PrimitiveAccordion.Root
      value={openAccordion}
      onValueChange={handledOpenAccordion}
      disabled={isDisabled}
      type="single"
      collapsible
    >
      <PrimitiveAccordion.Item value={list?.uuid!}>
        {/* <PrimitiveAccordion.Trigger
          className="[&[data-state=open]_.arrow]:rotate-180"
          asChild
        > */}
        <DivTable.Row
          className={twMerge(
            !isDisabled && "hover:bg-muted/50",
            "duration-[.15s] ease-in-out transition-colors"
          )}
        >
          <DivTable.Data>
            <div className="flex flex-col gap-1">
              <p className="line-clamp-1">{list?.title}</p>
              <div className="flex items-center gap-2">
                {badgeStatusInfoElement}
              </div>
            </div>
          </DivTable.Data>
          {loggedUser?.role === 1 && (
            <DivTable.Data className="gap-2">
              <ProgressBar value={progress} />
              <span className="text-xs text-muted-foreground">
                {solved}/{totalProblems}
              </span>
            </DivTable.Data>
          )}
          <DivTable.Data className="justify-end pr-4 gap-2">
            {!isDisabled && (
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
          {errorProblems && <FeedBackError onTryAgain={refetchProblems} />}
          <div className="grid grid-cols-3 gap-4 w-full border-none p-2">
            {isLoadingProblems &&
              getRange(0, 5).map((index) => (
                <Skeleton
                  key={`problem-skeleton-${index}`}
                  className="w-full h-26 rounded-lg"
                />
              ))}

            {problems?.map((problem, index) => (
              <ProblemCard
                key={`${problem?.uuid}-${index}`}
                data={{
                  ...problem,
                  listProblem: list,
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

export const ClassroomListsTable = ({
  isLoading,
  data,
  error,
  onTryAgainIfError,
}: ClassroomListsTableProps) => {
  const { loggedUser } = useAuth();

  const [listToEdit, setListToEdit] = useState<IListProblem | null>(null);

  const handledDataTable = useMemo(() => {
    if (error) {
      return <FeedBackError onTryAgain={onTryAgainIfError} />;
    }

    if (isLoading) {
      return (
        <>
          {getRange(0, 8).map((index) => (
            <DivTable.Row key={`skeleton-row-${index}-list`}>
              {getRange(0, 3).map((index) => (
                <DivTable.Data key={`skeleton-data-${index}-list`}>
                  <Skeleton className="h-4 max-w-[146px] w-full" />
                </DivTable.Data>
              ))}
            </DivTable.Row>
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
            onOpenEditModal={() => setListToEdit(list)}
          />
        ))}
      </>
    );
  }, [data, error, isLoading, onTryAgainIfError]);

  return (
    <>
      <div className="flex overflow-auto">
        <DivTable.Container>
          <DivTable.Row header>
            <DivTable.Data>Nome</DivTable.Data>
            {loggedUser?.role === 1 && <DivTable.Data>Progresso</DivTable.Data>}
            <DivTable.Data></DivTable.Data>
          </DivTable.Row>
          {handledDataTable}
          {data?.length === 0 && (
            <div className="flex justify-center items-center p-8">
              <h5 className="text-2xl text-gray-70">Tabela vazia</h5>
            </div>
          )}
        </DivTable.Container>
      </div>
      <Dialog.Root
        open={!!listToEdit}
        onOpenChange={(open) => !open && setListToEdit(null)}
      >
        <Dialog.Content>
          <form onSubmit={(e) => e.preventDefault()}>
            <Dialog.Header>
              <Dialog.Title>Configurar</Dialog.Title>
            </Dialog.Header>
          </form>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Switch label="Possui Início e fim?" />
              <div className="flex gap-4">
                <Input label="Início" type="date" />
                <Input label="Fim" type="date" />
              </div>
            </div>
            <Checkbox id="tes" label="Visível para os alunos" />
          </div>
          <Dialog.Footer>
            <Button variantStyle="secondary">Cancelar</Button>
            <Button>Salvar</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
