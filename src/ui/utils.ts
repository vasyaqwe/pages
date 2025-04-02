import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const wait = (ms: number) =>
   new Promise((resolve) => setTimeout(resolve, ms))
