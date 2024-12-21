import "./ui/styles.css"
import { db } from "@/db"
import { Icons } from "@/ui/components/icons"
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
   defaultPendingComponent: () => (
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-full">
         <Icons.feather className="mx-auto size-6 animate-fade-in opacity-0 drop-shadow-md [--animation-delay:100ms]" />
         <h1 className="mt-5 animate-fade-in text-center font-medium text-foreground/80 opacity-0 duration-500 [--animation-delay:600ms]">
            Workspace is loading...
         </h1>
      </div>
   ),
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
