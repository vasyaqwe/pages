import { logger } from "@/lib/logger"
import { note } from "@/note/schema"
import { Button } from "@/ui/components/button"
import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"

export const Route = createFileRoute("/settings")({
   component: RouteComponent,
})

function RouteComponent() {
   const { db } = Route.useRouteContext()
   const fileRef = React.useRef<HTMLInputElement>(null)

   return (
      <div className="container pt-8 md:pt-12">
         <div className="flex min-h-[53px] items-center justify-between border-border border-t pt-5">
            <h1 className="text-foreground/80">SETTINGS</h1>
         </div>
         <div className="mt-10">
            <h2 className="mt-5 font-semibold text-xl">Export notes</h2>
            <Button
               className="mt-5"
               variant={"secondary"}
               onClick={async () => {
                  const notes = await db.select().from(note)
                  const blob = new Blob([JSON.stringify(notes)], {
                     type: "application/json",
                  })
                  const url = URL.createObjectURL(blob)

                  const a = document.createElement("a")
                  a.href = url
                  a.download = "notes.json"
                  a.click()

                  URL.revokeObjectURL(url)
               }}
            >
               Download all notes
            </Button>
         </div>
         <div className="mt-10">
            <h2 className="mt-5 font-semibold text-xl">Import notes</h2>
            <Button
               className="mt-5"
               onClick={() => fileRef.current?.click()}
               variant={"secondary"}
            >
               Upload a file
            </Button>
            <input
               className="invisible"
               ref={fileRef}
               type="file"
               accept=".json"
               onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return alert("No file selected")

                  const text = await file.text()
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  const notes = JSON.parse(text).map((note: any) => ({
                     ...note,
                     id: undefined,
                     createdAt: note.createdAt
                        ? new Date(note.createdAt)
                        : null,
                     updatedAt: note.updatedAt
                        ? new Date(note.updatedAt)
                        : null,
                  }))

                  try {
                     await db
                        .insert(note)
                        .values(notes)
                        .then(() => alert("Imported successfully"))
                  } catch (error) {
                     logger.error(error)
                     alert("Error importing notes")
                  }
               }}
            />
         </div>
      </div>
   )
}
