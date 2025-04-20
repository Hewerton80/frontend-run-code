import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";

type DateFormatsType = "dd/MM/yyyy" | "HH:mm:ss" | "dd MMM, yyyy";

type DateType = string | number | Date;

export const DateTime = {
  format: (date: DateType, formatStr: DateFormatsType) => {
    return format(new Date(date), formatStr, { locale: ptBR });
  },
  isBetween: (start: DateType, end: DateType, data: DateType) => {
    const startDate = startOfDay(new Date(start));
    const endDate = endOfDay(new Date(end));
    const dateToCheck = startOfDay(new Date(data));

    return isAfter(dateToCheck, startDate) && isBefore(dateToCheck, endDate);
  },
  differenceInDays,
  isAfter,
  subDays,
  addDays,
  isValid: (date?: any) => {
    if (!date) return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  },
  startOfDay,
  endOfDay,
  isBefore,
};
