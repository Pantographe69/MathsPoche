import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combines clsx + tailwind-merge for conditional className composition. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
