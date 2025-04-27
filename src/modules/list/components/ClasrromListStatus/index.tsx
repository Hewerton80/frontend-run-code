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

  const hasNotRangeDates = !startDate && !endDate;

  const badgeStatusInfoElement = useMemo(() => {
    if (list?.status === 1) {
      return (
        <>
          <Badge variant="info">Não visível para os alunos</Badge>
        </>
      );
    }
    if (hasNotRangeDates || alreadyStarted) {
      return (
        <>
          <Badge variant="success">Aberta</Badge>
        </>
      );
    }
    if (didNotStart) {
      return (
        <>
          <Badge variant="warning">Não iniciada</Badge>
        </>
      );
    }
    if (alreadyFinished) {
      return (
        <>
          <Badge variant="dark">Finalizada</Badge>
        </>
      );
    }
  }, [alreadyStarted, didNotStart, alreadyFinished, hasNotRangeDates, list]);

  return (
    <div className="flex items-center gap-2">
      {badgeStatusInfoElement}
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
    </div>
  );
};
