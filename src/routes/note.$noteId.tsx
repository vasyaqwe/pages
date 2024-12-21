import { useDebounceCallback } from "@/interactions/use-debounced-value"
import { note as noteSchema } from "@/note/schema"
import { Button, buttonVariants } from "@/ui/components/button"
import { EditorContent, EditorRoot } from "@/ui/components/editor"
import { placeholder, starterKit } from "@/ui/components/editor/extensions"
import { link } from "@/ui/components/editor/link/extension"
import type { EditorInstance } from "@/ui/components/editor/types"
import { isOnFirstLine } from "@/ui/components/editor/utils"
import { Icons } from "@/ui/components/icons"
import { cn } from "@/ui/utils"
import {
   Link,
   createFileRoute,
   notFound,
   useBlocker,
   useNavigate,
   useRouter,
} from "@tanstack/react-router"
import { eq } from "drizzle-orm"
import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"

export const Route = createFileRoute("/note/$noteId")({
   component: RouteComponent,
   loader: async ({ context, params }) => {
      const note = await context.db.query.note.findFirst({
         where: eq(noteSchema.id, params.noteId),
      })

      if (!note) throw notFound()

      return {
         note,
      }
   },
})

function RouteComponent() {
   const { db } = Route.useRouteContext()
   const { note } = Route.useLoaderData()
   const router = useRouter()
   const navigate = useNavigate()

   const titleRef = React.useRef<HTMLInputElement>(null)
   const contentRef = React.useRef<EditorInstance>(null)
   const [content, setContent] = React.useState(note.content)

   useHotkeys(
      "escape",
      (e) => {
         e.preventDefault()
         navigate({ to: "/" })
      },
      {
         enableOnContentEditable: true,
      },
   )

   const debouncedSaveTitle = useDebounceCallback(async (title) => {
      await db
         .update(noteSchema)
         .set({ title })
         .where(eq(noteSchema.id, note.id))

      router.invalidate()
   }, 700)

   const debouncedSaveContent = useDebounceCallback(async (content) => {
      await db
         .update(noteSchema)
         .set({ content })
         .where(eq(noteSchema.id, note.id))

      router.invalidate()
   }, 700)

   useBlocker({
      enableBeforeUnload: false,
      shouldBlockFn: async () => {
         await db
            .update(noteSchema)
            .set({ title: titleRef.current?.value })
            .where(eq(noteSchema.id, note.id))

         await db
            .update(noteSchema)
            .set({ content })
            .where(eq(noteSchema.id, note.id))

         router.invalidate()

         return false
      },
   })

   return (
      <div className="absolute inset-0 bg-elevated-1 p-2.5">
         <div className="h-full overflow-y-auto rounded-xl border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between p-3 pb-0 lg:p-4 lg:pb-0">
               <Link
                  to={"/"}
                  className={cn(
                     buttonVariants({
                        variant: "ghost",
                        size: "icon-sm",
                     }),
                  )}
               >
                  <Icons.xMark className="size-4" />
               </Link>
               <Button
                  onClick={async () => {
                     await db
                        .delete(noteSchema)
                        .where(eq(noteSchema.id, note.id))
                     navigate({ to: "/" })
                     router.invalidate()
                  }}
                  variant={"destructive"}
                  size={"icon-sm"}
               >
                  <Icons.trash className="size-4" />
               </Button>
            </div>
            <div className="container mt-4">
               <input
                  ref={titleRef}
                  autoComplete="off"
                  defaultValue={note.title}
                  onChange={async (e) =>
                     await debouncedSaveTitle(e.target.value)
                  }
                  className="h-10 w-full border-none bg-transparent font-bold text-2xl outline-hidden"
                  placeholder="Title"
                  name="title"
                  type="text"
               />
               <EditorRoot>
                  <EditorContent
                     autofocus={"end"}
                     onCreate={({ editor }) => {
                        contentRef.current = editor
                     }}
                     className="mt-3 mb-7"
                     content={note.content}
                     extensions={[
                        starterKit,
                        placeholder("Write details (markdown supported)"),
                        link,
                     ]}
                     onUpdate={async ({ editor }) => {
                        setContent(editor.getHTML())
                        await debouncedSaveContent(editor.getHTML())
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
            </div>
         </div>
      </div>
   )
}
