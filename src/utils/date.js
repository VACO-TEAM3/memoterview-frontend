import { format, parseISO } from "date-fns";

export function changeDateFormat(date, dateFormat) {
  const parsedDate = parseISO(date);

  return format(parsedDate, dateFormat);
};
