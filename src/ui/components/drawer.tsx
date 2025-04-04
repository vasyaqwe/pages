import { cn } from "@/ui/utils"
import { Drawer as DrawerPrimitive } from "vaul"

const Drawer = DrawerPrimitive.Root
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

function DrawerOverlay({
   className,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
   return (
      <DrawerPrimitive.Overlay
         className={cn("fixed inset-0 z-50 bg-black/40", className)}
         {...props}
      />
   )
}

function DrawerContent({
   className,
   children,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
   return (
      <DrawerPortal>
         <DrawerOverlay />
         <DrawerPrimitive.Content
            onPointerDownOutside={(e) => {
               // don't dismiss dialog when clicking inside the toast
               if (
                  e.target instanceof Element &&
                  e.target.closest("[data-sonner-toast]")
               ) {
                  e.preventDefault()
               }
            }}
            className={cn(
               "group fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[88svh] flex-col rounded-t-xl border border-neutral bg-background md:max-h-[94svh]",
               "shadow-[0_-8px_10px_0px_hsl(var(--foreground)/.03)] [&[data-vaul-drawer-direction=right]]:right-0 [&[data-vaul-drawer-direction=right]]:left-auto",
               "[&[data-vaul-drawer-direction=right]]:mt-0 [&[data-vaul-drawer-direction=right]]:h-screen [&[data-vaul-drawer-direction=right]]:max-h-full",
               "[&[data-vaul-drawer-direction=right]]:top-2 [&[data-vaul-drawer-direction=right]]:right-2 [&[data-vaul-drawer-direction=right]]:h-auto",
               "[&[data-vaul-drawer-direction=right]]:bottom-2 [&[data-vaul-drawer-direction=right]]:after:hidden",
               "[&[data-vaul-drawer-direction=right]]:w-[90%] [&[data-vaul-drawer-direction=right]]:rounded-2xl sm:[&[data-vaul-drawer-direction=right]]:w-[475px]",
               className,
            )}
            {...props}
         >
            <div className="!p-0 mx-auto mt-[3px] min-h-1 w-7 rounded-full bg-foreground/80 group-[&[data-vaul-drawer-direction=right]]:hidden" />
            {children}
         </DrawerPrimitive.Content>
      </DrawerPortal>
   )
}

function DrawerHeader({
   className,
   children,
   ...props
}: React.ComponentProps<"div">) {
   return (
      <header
         className={cn(
            "grid gap-1.5 border-neutral border-b px-4 pt-3 pb-4 md:py-3",
            className,
         )}
         {...props}
      >
         {children}
      </header>
   )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         style={{
            paddingBottom: `max(calc(env(safe-area-inset-bottom) + 0.5rem), 1rem)`,
         }}
         className={cn(
            "sticky bottom-0 mt-auto flex items-center justify-between gap-2 border border-t-border p-4",
            className,
         )}
         {...props}
      />
   )
}

function DrawerTitle({
   className,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
   return (
      <DrawerPrimitive.Title
         className={cn(
            "text-center font-semibold text-lg leading-none tracking-tight md:text-xl",
            className,
         )}
         {...props}
      />
   )
}

function DrawerDescription({
   className,
   ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
   return (
      <DrawerPrimitive.Description
         className={cn("text-foreground/70 text-sm", className)}
         {...props}
      />
   )
}

export {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerPortal,
   DrawerTitle,
   DrawerTrigger,
}
