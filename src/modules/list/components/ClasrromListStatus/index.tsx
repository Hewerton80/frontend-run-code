import { Badge } from "@/components/ui/dataDisplay/Badge";
import { useGetClassroomListStatus } from "../../hooks/useGetClassroomListStatus";
import { IListProblem } from "../../listProblemTypes";
import { DateTime } from "@/utils/dateTime";
import { useMemo } from "react";

interface ClasrromListStatusProps {
  list: IListProblem;
}

export const ClasrromListStatus = ({ list }: ClasrromListStatusProps) => {
  const { alreadyFinished, alreadyStarted, didNotStart } =
    useGetClassroomListStatus(list);

  const startDate = list.startDate;
  const endDate = list.endDate;

  const datesInfo = useMemo(() => {
    return (
      <span className="text-xs text-muted-foreground line-clamp-1">
        {[
          startDate
            ? `${DateTime.format(startDate!, "dd MMM, yyyy")}`
            : undefined,
          endDate ? `${DateTime.format(endDate!, "dd MMM, yyyy")}` : undefined,
          ,
        ]
          .filter((value) => !!value)
          .join(" - ")}
      </span>
    );
  }, [startDate, endDate]);

  const badgeStatusInfoElement = useMemo(() => {
    if (list?.status === 1) {
      return (
        <>
          <Badge variant="info">Não visível para os alunos</Badge>
          {datesInfo}
        </>
      );
    }
    if ((!startDate && !endDate) || alreadyStarted) {
      return (
        <>
          <Badge variant="success">Aberta</Badge>
          {datesInfo}
        </>
      );
    }
    if (didNotStart) {
      return (
        <>
          <Badge variant="warning">Não iniciada</Badge>
          {datesInfo}
        </>
      );
    }
    if (alreadyFinished) {
      return (
        <>
          <Badge variant="dark">Finalizada</Badge>
          {datesInfo}
        </>
      );
    }
  }, [
    alreadyStarted,
    startDate,
    endDate,
    didNotStart,
    alreadyFinished,
    datesInfo,
    list,
  ]);

  return <>{badgeStatusInfoElement}</>;
};
