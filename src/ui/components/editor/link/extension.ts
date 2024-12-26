import { cn } from "@/ui/utils"
import linkExtension from "@tiptap/extension-link"

const link = linkExtension.configure({
   HTMLAttributes: {
      class: cn("cursor-pointer text-foreground underline"),
   },
})

export { link }
