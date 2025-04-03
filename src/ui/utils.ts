import { cx as cxBase } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

export const cx = cxBase
export const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs))
export const wait = (ms: number) =>
   new Promise((resolve) => setTimeout(resolve, ms))
