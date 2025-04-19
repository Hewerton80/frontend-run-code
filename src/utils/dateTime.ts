import {
  addDays,
  addHours,
  differenceInDays,
  endOfDay,
  format,
  isAfter,
  isBefore,
  startOfDay,
  subDays,
  subHours,
  isValid,
} from "date-fns";

type DateFormatsType =
  | "dd/MM/yyyy"
  | "HH:mm:ss"
  | "yyyy-MM-dd"
  | "dd/MM/yyyy HH:mm:ss"
  | "HH:mm • dd/MM/yyy"
  | "dd/MM/yyyy - HH:mm"
  | "'Data:' dd/MM/yyyy"
  | "'Horário:' HH:mm"
  | "dd/MM/yyyy 'às' HH:mm";

type DateType = string | number | Date;

export const DateTime = {
  format: (date: DateType, formatStr: DateFormatsType) => {
    return format(new Date(date), formatStr);
  },
  differenceInDays,
  isAfter,
  subDays,
  addDays,
  isValid,
  startOfDay,
  endOfDay,
  isBefore,
};
