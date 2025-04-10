import { formatDateRelative } from "@/date"
import { type Note, note } from "@/note/schema"
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
import { wait } from "@/ui/utils"
import { Link, createFileRoute } from "@tanstack/react-router"
import { useRouter } from "@tanstack/react-router"
import { desc } from "drizzle-orm"
import * as React from "react"

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
   const { notes } = Route.useLoaderData()

   return (
      <div className="container py-8 md:py-12">
         <div className="flex items-center justify-between border-neutral border-t pt-5">
            <p className="font-secondary text-xl">
               {notes.length === 0
                  ? "Empty"
                  : `${notes.length} ${notes.length === 1 ? "page" : "pages"}`}
            </p>
            <CreateNote />
         </div>
         <div className="mt-10">
            {notes.length === 0 ? (
               <p className="mt-16 text-center text-foreground/70">
                  Write some pages.
               </p>
            ) : (
               notes.map((note) => (
                  <NoteItem
                     key={note.id}
                     note={note}
                  />
               ))
            )}
         </div>
      </div>
   )
}

function NoteItem({ note }: { note: Note }) {
   return (
      <Link
         to={"/note/$noteId"}
         params={{ noteId: note.id }}
         className="relative isolate mt-6 block w-full cursor-(--cursor) before:absolute before:inset-[-12px_-12px_-12px_-12px] before:rounded-2xl before:transition-colors before:duration-100 hover:before:bg-primary-2"
         key={note.id}
      >
         <div className="relative z-[1]">
            <p className="break-all font-secondary text-[1.2rem] leading-[1.1]">
               {note.title}
            </p>
            <p className="mt-1.5 text-foreground/75 text-xs">
               {formatDateRelative(note.createdAt)}
            </p>
         </div>
      </Link>
   )
}

function CreateNote() {
   const { db } = Route.useRouteContext()
   const router = useRouter()

   const titleRef = React.useRef<HTMLInputElement>(null)
   const contentRef = React.useRef<EditorInstance>(null)
   const [content, setContent] = React.useState("")
   const [open, setOpen] = React.useState(false)

   return (
      <Drawer
         open={open}
         onOpenChange={setOpen}
      >
         <DrawerTrigger className={buttonVariants()}>
            <Icons.feather className="size-4" />
            Write
         </DrawerTrigger>
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

                     setContent("")
                     setOpen(false)

                     await wait(200)
                     router.invalidate()
                  }}
                  className="container flex flex-1 flex-col items-start py-10"
               >
                  <input
                     required
                     ref={titleRef}
                     autoFocus
                     className="h-10 w-full border-none bg-transparent font-bold font-secondary text-2xl outline-hidden"
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
                  <Button className="mt-auto">Done</Button>
               </form>
            </div>
         </DrawerContent>
      </Drawer>
   )
}
