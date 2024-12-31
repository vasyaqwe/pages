import { focusStyles } from "@/ui/constants"
import { cn } from "@/ui/utils"
import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs"

const Tabs = TabsPrimitive.Root

function TabsList({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
   return (
      <TabsPrimitive.List
         className={cn("flex gap-1", className)}
         {...props}
      />
   )
}

function TabsTab({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
   return (
      <TabsPrimitive.Tab
         className={cn(
            "inline-flex h-8 cursor-(--cursor) items-center justify-center rounded-full px-2.5 aria-selected:bg-primary aria-selected:text-primary-foreground",
            "text-foreground/75 disabled:cursor-not-allowed hover:text-foreground disabled:opacity-70 aria-selected:shadow-xs",
            focusStyles,
            className,
         )}
         {...props}
      />
   )
}

function TabsIndicator({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Indicator>) {
   return (
      <TabsPrimitive.Indicator
         className={cn("", className)}
         {...props}
      />
   )
}

function TabsPanel({
   className,
   ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
   return (
      <TabsPrimitive.Panel
         className={cn("", className)}
         {...props}
      />
   )
}

export { Tabs, TabsList, TabsTab, TabsIndicator, TabsPanel }
