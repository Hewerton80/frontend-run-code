import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  subDays,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";

type DateFormatsType =
  | "dd/MM/yyyy"
  | "yyyy-MM-dd"
  | "yyyy-MM-dd HH:mm:ss"
  | "dd/MM/yyyy - HH:mm"
  | "HH:mm:ss"
  | "dd MMM, yyyy";

type DateType = string | number | Date;

export const DateTime = {
  format: (date: DateType, formatStr: DateFormatsType) => {
    return format(new Date(date), formatStr, { locale: ptBR });
  },
  isBetween: (start: DateType, end: DateType, data: DateType) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateToCheck = new Date(data);

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
  isSameDay,
};
