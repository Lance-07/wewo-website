import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function convertLiterToMl(value: string): string {
  const ml = parseInt(value, 10);

  if (isNaN(ml) || ml < 1000) return `${ml || 0} ml`;

  return `${(ml / 1000).toFixed(2).replace(/\.00$/, '')} L`;
}
