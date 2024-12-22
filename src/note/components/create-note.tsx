import { popModal } from "@/modals"
import { note } from "@/note/schema"
import { Route } from "@/routes/__root"
import { Button } from "@/ui/components/button"
import { DrawerContent, DrawerTitle } from "@/ui/components/drawer"
import { EditorContent, EditorRoot } from "@/ui/components/editor"
import { placeholder, starterKit } from "@/ui/components/editor/extensions"
import { link } from "@/ui/components/editor/link/extension"
import type { EditorInstance } from "@/ui/components/editor/types"
import { isOnFirstLine } from "@/ui/components/editor/utils"
import { wait } from "@/utils/misc"
import { useRouter } from "@tanstack/react-router"
import * as React from "react"

export function CreateNote() {
   const { db } = Route.useRouteContext()
   const router = useRouter()

   const titleRef = React.useRef<HTMLInputElement>(null)
   const contentRef = React.useRef<EditorInstance>(null)
   const [content, setContent] = React.useState("")

   return (
      <DrawerContent className="h-full">
         <DrawerTitle className="sr-only">Write a new note</DrawerTitle>
         <div className="flex h-full flex-col overflow-y-auto">
            <form
               onSubmit={async (e) => {
                  e.preventDefault()
                  const { title } = Object.fromEntries(
                     new FormData(e.target as HTMLFormElement).entries(),
                  ) as { title: string }

                  await db.insert(note).values({ title, content })

                  popModal("create_note")
                  setContent("")

                  await wait(200)
                  router.invalidate()
               }}
               className="container flex flex-1 flex-col items-start py-10"
            >
               <input
                  required
                  ref={titleRef}
                  autoFocus
                  className="h-10 w-full border-none bg-transparent font-bold text-2xl outline-hidden"
                  placeholder="Title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  onKeyDown={(e) => {
                     if (e.key === "ArrowDown") {
                        e.preventDefault()
                        contentRef.current?.commands.focus("start")
                     }
                  }}
               />
               <EditorRoot>
                  <EditorContent
                     onCreate={({ editor }) => {
                        contentRef.current = editor
                     }}
                     className="mt-3 mb-7"
                     content={content}
                     extensions={[
                        starterKit,
                        placeholder("Write details (markdown supported)"),
                        link,
                     ]}
                     onUpdate={({ editor }) => {
                        setContent(editor.getHTML())
                     }}
                     editorProps={{
                        handleKeyDown: (view, e) => {
                           if (e.key === "ArrowUp") {
                              if (!isOnFirstLine(view)) return false

                              titleRef.current?.focus()
                              titleRef.current?.setSelectionRange(
                                 titleRef.current?.value.length,
                                 titleRef.current?.value.length,
                              )
                              return true
                           }

                           return false
                        },
                     }}
                     placeholder="Write details (markdown supported)"
                  />
               </EditorRoot>
               <Button className="mt-auto">DONE</Button>
            </form>
         </div>
      </DrawerContent>
   )
}
