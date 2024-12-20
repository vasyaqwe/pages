import type { Database } from "@/db"
import {
   Outlet,
   createRootRouteWithContext,
   useMatches,
} from "@tanstack/react-router"
import { useTheme } from "next-themes"
import { type ReactNode, useEffect } from "react"

export const Route = createRootRouteWithContext<{
   db: Database
}>()({
   component: RootComponent,
})

function RootComponent() {
   const { resolvedTheme } = useTheme()

   useEffect(() => {
      if (resolvedTheme === "dark") {
         document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", "#0a0a0b")
      } else {
         document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", "#FFFFFF")
      }
   }, [resolvedTheme])

   return (
      <Meta>
         <main className="container">
            <Outlet />
         </main>
      </Meta>
   )
}

function Meta({ children }: { children: ReactNode }) {
   const matches = useMatches()
   const meta = matches.at(-1)?.meta?.find((meta) => meta?.title)

   useEffect(() => {
      document.title = [meta?.title ?? "Pages"].filter(Boolean).join(" · ")
   }, [meta])

   return children
}
