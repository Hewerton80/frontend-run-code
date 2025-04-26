import { DateTime } from "@/utils/dateTime";
import { IListProblem } from "../listProblemTypes";
import { useMemo } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const useGetClassroomListStatus = (list: IListProblem) => {
  const startDate = list.startDate;
  const endDate = list.endDate;

  const { loggedUser } = useAuth();

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

  const closed = useMemo(() => {
    if (loggedUser?.role === 2) {
      return false;
    }
    return didNotStart || alreadyFinished || list?.status === 1;
  }, [didNotStart, alreadyFinished, list, loggedUser]);

  return {
    alreadyStarted,
    didNotStart,
    alreadyFinished,
    closed,
  };
};
