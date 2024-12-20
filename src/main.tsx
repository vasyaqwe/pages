import "./ui/styles.css"
import { db } from "@/db"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
   routeTree,
   context: {
      db,
   },
   defaultPreload: "render",
   // defaultNotFoundComponent: NotFoundComponent,
   // defaultErrorComponent: ({ error }) => {
   //    return <ErrorComponent error={error} />
   // },
})

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

// biome-ignore lint/style/noNonNullAssertion: ...
ReactDOM.createRoot(document.getElementById("app")!).render(
   <React.StrictMode>
      <ThemeProvider
         defaultTheme="light"
         attribute="class"
         enableSystem
         disableTransitionOnChange
      >
         <RouterProvider router={router} />
      </ThemeProvider>
   </React.StrictMode>,
)
