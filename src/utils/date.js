import { format, parseISO } from "date-fns";

export function changeDateFormat(date, dateFormat) {
  const parsedDate = parseISO(date);

  return format(parsedDate, dateFormat);
};

export function formatTimeForTimer(time) {
  let hour = Math.floor(time / 60);
  let min = time % 60;

  hour = hour < 10 ? `0${hour}` : hour;
  min = min < 10 ? `0${min}` : min;

  return { hour, min };
}
