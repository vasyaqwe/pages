import { cn } from "@/ui/utils"
import placeholderExtension from "@tiptap/extension-placeholder"
import starterKitExtension from "@tiptap/starter-kit"

const placeholder = (placeholder: string) =>
   placeholderExtension.configure({
      placeholder: () => placeholder,
      includeChildren: true,
   })

const starterKit = starterKitExtension.configure({
   bulletList: {
      HTMLAttributes: {
         class: cn("list-none leading-2"),
      },
   },
   orderedList: {
      HTMLAttributes: {
         class: cn("leading-2"),
      },
   },
   listItem: {
      HTMLAttributes: {
         class: cn("leading-normal"),
      },
   },
   gapcursor: false,
})

export { starterKit, placeholder }
