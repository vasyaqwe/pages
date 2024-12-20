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
import { formatDateRelative } from "@/utils/format"
import { Link, createFileRoute, useRouter } from "@tanstack/react-router"
import { desc } from "drizzle-orm"
import * as React from "react"

export const Route = createFileRoute("/")({
   component: RouteComponent,
   loader: async ({ context }) => {
      // await context.db.execute(`DROP TABLE IF EXISTS "note";`)

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

   return (
      <div className="container pt-8 md:pt-12">
         <div className="flex items-center justify-between border-border border-t pt-5">
            <p className="text-foreground/80">
               {notes.length === 0 ? "EMPTY" : `${notes.length} NOTES`}
            </p>
            <Drawer
               open={drawerOpen}
               onOpenChange={setDrawerOpen}
            >
               <DrawerTrigger className={buttonVariants()}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     viewBox="0 0 20 20"
                  >
                     <g fill="currentColor">
                        <path
                           d="m10.125,11.167s3.167.688,5.214-.86c.706-.49,1.286-1.223,1.576-2.337.158-.692.258-1.359.354-2.004.148-.993.289-1.93.598-2.468.186-.323.176-.722-.024-1.036-.2-.313-.555-.489-.93-.458C3.722,3.158,2.022,16.75,2.007,16.887c-.062.549.331,1.044.88,1.107.038.004.077.006.114.006.502,0,.935-.376.992-.887.004-.037.151-1.192.682-2.802,1.634.375,3.085.574,4.34.574,1.731,0,3.113-.357,4.171-1.072.322-.217.6-.476.854-.757-3.002-.561-3.914-1.89-3.914-1.89Z"
                           strokeWidth="0"
                           fill="currentColor"
                        />
                     </g>
                  </svg>
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
                           new FormData(e.target as HTMLFormElement).entries(),
                        ) as { title: string }

                        await db.insert(note).values({ title })
                        setDrawerOpen(false)
                        router.invalidate()
                     }}
                     className="container flex flex-1 flex-col items-start py-10"
                  >
                     <input
                        ref={titleRef}
                        autoFocus
                        className="h-10 w-full border-none bg-transparent font-bold text-xl outline-hidden"
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
                           placeholder="Add description (press '/' for commands)"
                        />
                     </EditorRoot>
                     <Button className="mt-auto">DONE</Button>
                  </form>
                 </div>
               </DrawerContent>
            </Drawer>
         </div>
         <div className="mt-10 space-y-5">
            {notes.map((note) => (
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
