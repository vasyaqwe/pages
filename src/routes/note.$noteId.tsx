import { note } from "@/note/schema"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { eq } from "drizzle-orm"

export const Route = createFileRoute("/note/$noteId")({
   component: RouteComponent,
   loader: async ({ context, params }) => {
      const foundNote = await context.db.query.note.findFirst({
         where: eq(note.id, params.noteId),
      })

      if (!foundNote) throw notFound()

      return {
         note: foundNote,
      }
   },
})

function RouteComponent() {
   const { note } = Route.useLoaderData()

   return <div>{note.title}</div>
}
