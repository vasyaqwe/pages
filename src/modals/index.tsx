import { createPushModal } from "@/modals/factory"
import { CreateNote } from "@/note/components/create-note"
import { Drawer } from "@/ui/components/drawer"

export const {
   pushModal,
   popModal,
   popAllModals,
   replaceWithModal,
   useOnPushModal,
   onPushModal,
   ModalProvider,
} = createPushModal({
   modals: {
      create_note: {
         Wrapper: Drawer,
         Component: CreateNote,
      },
   },
})
