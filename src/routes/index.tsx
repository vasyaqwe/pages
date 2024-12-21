import { note } from "@/note/schema"
import { Button, buttonVariants } from "@/ui/components/button"
import {
   Drawer,
   DrawerContent,
   DrawerTitle,
   DrawerTrigger,
} from "@/ui/components/drawer"
import { EditorContent, EditorRoot } from "@/ui/components/editor"
import { placeholder, starterKit } from "@/ui/components/editor/extensions"
import { link } from "@/ui/components/editor/link/extension"
import type { EditorInstance } from "@/ui/components/editor/types"
import { isOnFirstLine } from "@/ui/components/editor/utils"
import { Icons } from "@/ui/components/icons"
import { formatDateRelative } from "@/utils/format"
import { Link, createFileRoute, useRouter } from "@tanstack/react-router"
import { desc } from "drizzle-orm"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"

export const Route = createFileRoute("/")({
   component: RouteComponent,
   loader: async ({ context }) => {
      return {
         notes: await context.db
            .select()
            .from(note)
            .orderBy(desc(note.createdAt)),
      }
   },
})

function RouteComponent() {
   const { db } = Route.useRouteContext()
   const { notes } = Route.useLoaderData()
   const router = useRouter()

   const [drawerOpen, setDrawerOpen] = React.useState(false)
   const [content, setContent] = React.useState("")

   const titleRef = React.useRef<HTMLInputElement>(null)
   const contentRef = React.useRef<EditorInstance>(null)

   useHotkeys("w", (e) => {
      e.preventDefault()
      setDrawerOpen(true)
   })

   return (
      <div className="container py-8 md:py-12">
         <div className="flex items-center justify-between border-border border-t pt-5">
            <p className="text-foreground/80">
               {notes.length === 0 ? "EMPTY" : `${notes.length} NOTES`}
            </p>
            <Drawer
               open={drawerOpen}
               onOpenChange={setDrawerOpen}
            >
               <DrawerTrigger className={buttonVariants()}>
                  <Icons.feather className="size-4" />
                  WRITE
               </DrawerTrigger>
               <DrawerContent className="h-full">
                  <DrawerTitle className="sr-only">
                     Write a new note
                  </DrawerTitle>
                  <div className="flex h-full flex-col overflow-y-auto">
                     <form
                        onSubmit={async (e) => {
                           e.preventDefault()
                           const { title } = Object.fromEntries(
                              new FormData(
                                 e.target as HTMLFormElement,
                              ).entries(),
                           ) as { title: string }

                           await db.insert(note).values({ title, content })

                           setDrawerOpen(false)
                           setContent("")
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
                                 placeholder(
                                    "Write details (markdown supported)",
                                 ),
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
            </Drawer>
         </div>
         <div className="mt-10 space-y-5">
            {notes.length === 0
               ? null
               : notes.map((note) => (
                    <Link
                       to={"/note/$noteId"}
                       params={{ noteId: note.id }}
                       className="relative isolate block w-full cursor-default before:absolute before:inset-[-8px_-10px_-8px_-10px] before:rounded-xl hover:before:bg-elevated-1"
                       key={note.id}
                    >
                       <div className="relative z-[1]">
                          <p className="line-clamp-1 font-semibold text-lg leading-tight">
                             {note.title}
                          </p>
                          <p className="mt-1.5 text-foreground/70 text-xs">
                             {formatDateRelative(note.createdAt)}
                          </p>
                       </div>
                    </Link>
                 ))}
         </div>
      </div>
   )
}
