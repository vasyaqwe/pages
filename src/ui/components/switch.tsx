import switch_sound from "@/assets/sound/switch.wav"
import { FOCUS_STYLES } from "@/ui/constants"
import { cn } from "@/ui/utils"
import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch"
import useSound from "use-sound"

function Switch({
   className,
   children,
   onCheckedChange,
   ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
   const [play] = useSound(switch_sound)

   return (
      <SwitchPrimitive.Root
         onCheckedChange={(checked, e) => {
            onCheckedChange?.(checked, e)
            play()
         }}
         className={cn(
            "inline-flex h-[23px] w-[38px] cursor-(--cursor) items-center rounded-full bg-muted shadow-xs data-checked:bg-primary data-checked:hover:bg-primary-hover hover:bg-muted-hover",
            FOCUS_STYLES,
            className,
         )}
         {...props}
      >
         {children}
         <SwitchThumb />
      </SwitchPrimitive.Root>
   )
}

function SwitchThumb({
   className,
   ...props
}: React.ComponentProps<typeof SwitchPrimitive.Thumb>) {
   return (
      <SwitchPrimitive.Thumb
         className={cn(
            "ml-[3px] block size-[17px] rounded-full bg-[#fff] shadow-2xs transition-transform ease-vaul data-checked:translate-x-[calc(100%-2px)] ",
            className,
         )}
         {...props}
      />
   )
}

export { Switch, SwitchThumb }
