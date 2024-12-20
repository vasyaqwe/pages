import { useDebounceCallback } from "@/interactions/use-debounced-value"
import { note as noteSchema } from "@/note/schema"
import { buttonVariants } from "@/ui/components/button"
import { cn } from "@/ui/utils"
import {
   Link,
   createFileRoute,
   notFound,
   useRouter,
} from "@tanstack/react-router"
import { eq } from "drizzle-orm"

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

   const debouncedSaveTitle = useDebounceCallback(async (title) => {
      await db
         .update(noteSchema)
         .set({ title })
         .where(eq(noteSchema.id, note.id))

      router.invalidate()
   }, 700)

   return (
      <div className="absolute inset-0 bg-elevated-1 p-2.5">
         <div className="h-full overflow-y-auto rounded-xl border border-border bg-background shadow-2xl">
            <div className="p-3 pb-0 lg:p-4 lg:pb-0">
               <Link
                  to={"/"}
                  className={cn(
                     buttonVariants({ variant: "secondary", size: "icon-sm" }),
                     "cursor-default rounded-full",
                  )}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="size-4"
                     viewBox="0 0 18 18"
                  >
                     <g fill="currentColor">
                        <path
                           d="M14 4L4 14"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                        />
                        <path
                           d="M4 4L14 14"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                        />
                     </g>
                  </svg>
               </Link>
            </div>
            <div className="container mt-4">
               <input
                  autoComplete="off"
                  defaultValue={note.title}
                  onChange={async (e) =>
                     await debouncedSaveTitle(e.target.value)
                  }
                  className="h-10 w-full border-none bg-transparent font-bold text-xl outline-hidden"
                  placeholder="Title"
                  name="title"
                  type="text"
               />
            </div>
         </div>
      </div>
   )
}
