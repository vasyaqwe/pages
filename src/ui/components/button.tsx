import { FOCUS_STYLES } from "@/ui/constants"
import { cn } from "@/ui/utils"
import { type VariantProps, cva } from "class-variance-authority"

const buttonVariants = cva(
   `relative inline-flex cursor-(--cursor) items-center justify-center font-medium gap-1.5 leading-none overflow-hidden whitespace-nowrap 
    disabled:opacity-70 disabled:cursor-not-allowed`,
   {
      variants: {
         variant: {
            default: `bg-primary shadow-sm border border-transparent text-primary-foreground hover:bg-primary-hover`,
            secondary: `bg-secondary border border-transparent text-secondary-foreground hover:bg-secondary-hover`,
            "popover-item": `bg-transparent border border-transparent text-primary-foreground hover:bg-popover-hover aria-[current=page]:bg-popover-hover`,
            destructive: `bg-elevated-2 border border-transparent text-foreground hover:text-destructive-foreground 
            hover:bg-destructive`,
            ghost: "border border-transparent hover:bg-elevated-2",
         },
         size: {
            default: "h-8 rounded-[10px] px-3 text-sm",
            sm: "h-8 rounded-lg px-2.5 text-sm",
            lg: "h-10 gap-2 rounded-xl px-4 text-base",
            xl: "h-11 gap-3 rounded-xl px-4 text-base",
            icon: "size-9 gap-0 rounded-full",
            "icon-sm": "size-8 gap-0 rounded-full",
         },
      },
      compoundVariants: [
         {
            className: FOCUS_STYLES,
         },
      ],
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   },
)

function Button({
   className,
   variant,
   size,
   ref,
   ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
   return (
      <button
         className={cn(buttonVariants({ variant, size, className }))}
         ref={ref}
         {...props}
      />
   )
}

export { Button, buttonVariants }
