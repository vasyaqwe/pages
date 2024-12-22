import { pushModal } from "@/modals"
import { note } from "@/note/schema"
import { Button } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import { formatDateRelative } from "@/utils/format"
import { Link, createFileRoute } from "@tanstack/react-router"
import { desc } from "drizzle-orm"

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
         <div className="flex items-center justify-between border-border border-t pt-5">
            <p className="text-foreground/80">
               {notes.length === 0 ? "EMPTY" : `${notes.length} PAGES`}
            </p>

            <Button onClick={() => pushModal("create_note")}>
               <Icons.feather className="size-4" />
               WRITE
            </Button>
         </div>
         <div className="mt-10">
            {notes.length === 0 ? (
               <p className="mt-16 text-center text-foreground/70 text-lg">
                  Write some pages.
               </p>
            ) : (
               notes.map((note) => (
                  <Link
                     to={"/note/$noteId"}
                     params={{ noteId: note.id }}
                     className="relative isolate mt-6 block w-full cursor-(--cursor) before:absolute before:inset-[-10px_-10px_-10px_-10px] before:rounded-2xl hover:before:bg-elevated-1"
                     key={note.id}
                  >
                     <div className="relative z-[1]">
                        <p className="line-clamp-1 break-all font-semibold text-lg leading-tight">
                           {note.title}
                        </p>
                        <p className="mt-1.5 text-foreground/65 text-xs">
                           {formatDateRelative(note.createdAt)}
                        </p>
                     </div>
                  </Link>
               ))
            )}
         </div>
      </div>
   )
}
