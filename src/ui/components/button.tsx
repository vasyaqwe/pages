import { cn } from "@/ui/utils"
import { type VariantProps, cva } from "class-variance-authority"
import type * as React from "react"

const buttonVariants = cva(
   `relative inline-flex items-center justify-center font-medium gap-1.5 leading-none overflow-hidden whitespace-nowrap focus-visible:ring-1 ring-offset-[1px] focus-visible:ring-accent/80 focus-visible:outline-accent/30 outline outline-3 outline-transparent outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed`,
   {
      variants: {
         variant: {
            default: `bg-primary/90 shadow-xs border border-transparent focus-visible:ring-accent text-background 
                     hover:bg-primary disabled:bg-border disabled:text-foreground disabled:border-foreground/10`,
            outline: `bg-background border border-transparent shadow-1 text-foreground data-[state=open]:border-border 
                     disabled:border-transparent hover:border-border`,
            ghost: "border border-transparent disabled:bg-transparent hover:bg-muted/70",
         },
         size: {
            default: "h-8 rounded-[10px] px-3 text-sm",
            sm: "h-8 rounded-lg px-2.5 text-sm",
            lg: "h-10 gap-2 rounded-xl px-4 text-base",
            xl: "h-11 gap-3 rounded-xl px-4 text-base",
            icon: "size-9 gap-0 rounded-lg",
         },
      },
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
