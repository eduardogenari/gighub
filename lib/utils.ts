import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToYYYYMMDD(date: Date) {
  // Get year, month, and day
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Pad month and day with leading zeros
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  // Format as YYYYMMDD
  const formattedDate = `${year}${paddedMonth}${paddedDay}`;

  return formattedDate;
}

export function YYYYMMDDToDate(date: string) {
  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6, 8), 10);

  return new Date(year, month, day);
}

export function formatDateToISO(date: string) {
  const dateISO = parseISO(date);
  return format(dateISO, "yyyy-MM-dd'T'00:00:00'Z'");
}

export function withinRange(rangeToCheck: number[], range: number[]) {
  const isWithinRange =
    range[0] >= rangeToCheck[0] && range[1] <= rangeToCheck[1];
  const isOverlappingRange =
    range[0] <= rangeToCheck[1] && range[1] >= rangeToCheck[0];
  return isWithinRange || isOverlappingRange;
}

export function sortWithCommas(array: string[]) {
  const sortedArray = array.sort((a, b) => {
    const aWithComma = a.includes(',');
    const bWithComma = b.includes(',');

    // Sort alphabetically if there are commas
    if (aWithComma === bWithComma) {
      return a.localeCompare(b);
    }

    // Go first if there are no commas
    return aWithComma ? 1 : -1;
  }) 
  return sortedArray
}
