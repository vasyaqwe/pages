import { FOCUS_STYLES } from "@/ui/constants"
import { cn } from "@/ui/utils"
import { type VariantProps, cva } from "class-variance-authority"

export const buttonVariants = cva(
   [
      "inline-flex cursor-(--cursor) items-center justify-center whitespace-nowrap text-base tracking-wide md:text-sm",
      "transition-colors duration-100 disabled:opacity-80",
   ],
   {
      variants: {
         variant: {
            primary:
               "bg-accent-6 font-[400] text-white shadow-[inset_0_-2px_1px_0_var(--tw-shadow-color,rgb(0_0_0_/_0.15))] shadow-text-2 hover:bg-accent-5 active:bg-accent-6",
            secondary:
               "border border-primary-5 bg-primary-3 font-[425] shadow-[inset_0_-1.5px_1px_0_var(--tw-shadow-color,rgb(0_0_0_/_0.1))] shadow-text-1 hover:border-primary-4 hover:bg-primary-2 active:bg-primary-3",
            ghost: "bg-transparent font-[425] hover:bg-primary-3 aria-[current=page]:bg-primary-3",
            destructive: "bg-red-100 text-red-900 hover:bg-red-200/80",
         },
         size: {
            sm: "h-8 rounded-md md:h-7",
            md: "h-9 rounded-lg md:h-8",
            lg: "h-10 rounded-xl md:h-9",
         },
         kind: {
            default: "gap-2 px-3",
            icon: "aspect-square w-auto justify-center",
         },
         shape: {
            square: "",
            circle: "!rounded-full",
         },
      },
      defaultVariants: {
         variant: "primary",
         size: "md",
         kind: "default",
         shape: "square",
      },
   },
)

interface Props
   extends React.ComponentProps<"button">,
      VariantProps<typeof buttonVariants> {}

export function Button({
   className,
   variant,
   size,
   shape,
   kind,
   ...props
}: Props) {
   return (
      <button
         className={cn(
            buttonVariants({ variant, size, shape, kind, className }),
            FOCUS_STYLES,
         )}
         {...props}
      />
   )
}
