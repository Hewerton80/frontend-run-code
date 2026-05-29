import { DateTime } from "@/utils/dateTime";
import { useMemo } from "react";
import { useLoggedUser } from "@/modules/auth/hooks/useLoggedUser";
import { RoleUser } from "@/modules/user/userTypets";

interface IUseGetClassroomListStatus {
  startDate?: string | null;
  endDate?: string | null;
  status: number;
}

export const useGetClassroomListStatus = (list: IUseGetClassroomListStatus) => {
  const startDate = list.startDate;
  const endDate = list.endDate;

  const { loggedUser } = useLoggedUser();

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
    if (loggedUser?.role === RoleUser.TEACHER) {
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
