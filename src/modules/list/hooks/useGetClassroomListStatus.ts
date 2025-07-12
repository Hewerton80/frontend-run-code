import { DateTime } from "@/utils/dateTime";
import { IList } from "../listTypes";
import { useMemo } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const useGetClassroomListStatus = (list: IList) => {
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
      return DateTime.isBetween(startDate, endDate, now);
    }
    return false;
  }, [startDate, endDate]);

  const didNotStart = useMemo(() => {
    const now = new Date();
    if (startDate && DateTime.isValid(startDate)) {
      return DateTime.isBefore(now, startDate);
    }
    return false;
  }, [startDate]);

  const alreadyFinished = useMemo(() => {
    const now = new Date();
    if (endDate && DateTime.isValid(endDate)) {
      return DateTime.isAfter(now, endDate);
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
