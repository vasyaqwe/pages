import { useCssVariable } from "@/interactions/use-css-variable"
import { note } from "@/note/schema"
import { Button } from "@/ui/components/button"
import { Switch } from "@/ui/components/switch"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/ui/components/tabs"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { zodValidator } from "@tanstack/zod-adapter"
import * as React from "react"
import { z } from "zod"

export const Route = createFileRoute("/settings")({
   component: RouteComponent,
   validateSearch: zodValidator(
      z.object({ tab: z.enum(["general", "preferences"]).catch("general") }),
   ),
})

function RouteComponent() {
   const { db } = Route.useRouteContext()
   const search = Route.useSearch()
   const navigate = useNavigate()
   const fileRef = React.useRef<HTMLInputElement>(null)
   const [cursor, setCursor] = useCssVariable("cursor", "default")

   return (
      <div className="container pt-8 md:pt-12">
         <Tabs
            value={search.tab}
            onValueChange={(tab) =>
               navigate({ to: ".", search: { tab }, replace: true })
            }
         >
            <div className="flex min-h-[53px] items-center justify-between border-border border-t pt-5">
               <h1 className="text-foreground/80">SETTINGS</h1>
               <TabsList>
                  <TabsTab value={"general"}>General</TabsTab>
                  <TabsTab value={"preferences"}>Preferences</TabsTab>
               </TabsList>
            </div>
            <TabsPanel value={"general"}>
               <div className="mt-10">
                  <h2 className="mt-5 font-semibold text-xl">
                     Export/import notes
                  </h2>
                  <p className="mt-3 mb-6 text-foreground/70 text-sm">
                     Do this to avoid data loss in case the browser's storage is
                     cleared.
                  </p>
                  <Button
                     className="mr-3"
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
                     DOWNLOAD
                  </Button>
                  <Button onClick={() => fileRef.current?.click()}>
                     UPLOAD
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
                           console.error(error)
                           alert("Error importing notes")
                        }
                     }}
                  />
               </div>
               <div className="mt-10">
                  <h2 className="mt-5 font-semibold text-xl">About</h2>
                  <p className="mt-3 mb-6 text-foreground/70 text-sm">
                     Pages' data is stored in the browser's storage. <br /> Be
                     cautios when clearing it, and export pages beforehand with
                     the button above.
                  </p>
                  <p className="mt-3 mb-6 text-foreground/70 text-sm">
                     Credits to the{" "}
                     <a
                        href="https://andyworksco.notion.site/Boring-Sound-Kit-d92a136378114eceb1898313acb673f0"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground"
                     >
                        <u>!Boring Sound Kit</u>{" "}
                     </a>
                     for all the sound feedback on interactions.
                  </p>
                  <p className="mt-3 mb-6 text-foreground/70 text-sm">
                     Pages is{" "}
                     <a
                        href="https://github.com/vasyaqwe/pages"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground"
                     >
                        <u>open source</u>
                     </a>
                     , created by{" "}
                     <a
                        href="https://vasyaqwe.com"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground"
                     >
                        <u>vasyaqwe</u>
                     </a>
                     .
                  </p>
               </div>
            </TabsPanel>
            <TabsPanel value={"preferences"}>
               <div className="mt-10">
                  <h2 className="mt-5 font-semibold text-xl">
                     Use pointer cursors
                  </h2>
                  <p className="mt-3 mb-6 text-foreground/70 text-sm">
                     Change the cursor to pointer when hovering over any
                     interactive elements.
                  </p>
                  <Switch
                     checked={cursor === "pointer"}
                     onCheckedChange={() =>
                        setCursor(cursor === "pointer" ? "default" : "pointer")
                     }
                  />
               </div>
            </TabsPanel>
         </Tabs>
      </div>
   )
}
