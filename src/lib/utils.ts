import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertLiterToMl(value: string): string {
  const ml = parseInt(value, 10);

  if (isNaN(ml) ||  ml < 1000) return `${ml || 0} ml`;

  return `${(ml / 1000).toFixed(2).replace(/.00$/, '')} L`;
}


export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const decodeJWT = (token: string) => {
  const [header, payload, signature] = token.split(".");
  return {
    header: JSON.parse(Buffer.from(header, "base64").toString()),
    payload: JSON.parse(Buffer.from(payload, "base64").toString()),
    signature,
  };
};
export function calculateTimePerDispensed(value: number | string): string {
  const DISPENSED_VALUE = 0.1;
  const milliliters = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(milliliters) || milliliters < 0) {
    throw new Error("Invalid input: value must be a positive number or a valid string.");
  }

  const timeInMilliseconds = (milliliters / DISPENSED_VALUE) + 1000;
  const timeInSecondsFormatted = (timeInMilliseconds / 1000).toFixed(2);
  
  return `${timeInSecondsFormatted.replace(/\.00$/, '')} ${getSecondLabel(timeInMilliseconds)}`;
}

function getSecondLabel(seconds: number): string {
  return seconds === 1 ? 'second' : 'seconds';
}
