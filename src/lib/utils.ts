// Simple utility to combine class names (like clsx)
// export function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(" ");
// }


// lib/utils.ts
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}