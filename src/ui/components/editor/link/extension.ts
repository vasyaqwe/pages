import { cn } from "@/ui/utils"
import linkExtension from "@tiptap/extension-link"

const link = linkExtension.configure({
   HTMLAttributes: {
      class: cn("cursor-pointer underline"),
   },
})

export { link }
