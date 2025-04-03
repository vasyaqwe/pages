import "./ui/styles.css"
import { databaseClient } from "@/database"
import { Button, buttonVariants } from "@/ui/components/button"
import { Icons } from "@/ui/components/icons"
import {
   ErrorComponent,
   type ErrorComponentProps,
   Link,
   RouterProvider,
   createRouter,
   rootRouteId,
   useMatch,
   useRouter,
} from "@tanstack/react-router"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

const router = createRouter({
   routeTree,
   context: {
      db: databaseClient,
   },
   defaultPreload: "render",
   defaultPendingComponent: () => (
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-full">
         <Icons.feather className="mx-auto size-6 animate-fade-in opacity-0 drop-shadow-md [--animation-delay:100ms]" />
         <h1 className="mt-5 animate-fade-in text-center font-medium opacity-0 duration-500 [--animation-delay:500ms]">
            Workspace is loading..
         </h1>
      </div>
   ),
   defaultNotFoundComponent: NotFound,
   defaultErrorComponent: CatchBoundary,
})

function NotFound() {
   return (
      <div className="flex grow flex-col items-center justify-center pt-20 text-center md:pt-40">
         <h1 className="mb-2 font-semibold text-xl">Not found</h1>
         <p className="mb-5 text-lg leading-snug opacity-70">
            This page does not exist — <br /> it may have been moved or deleted.
         </p>
         <Link
            to={"/"}
            className={buttonVariants()}
         >
            Back home
         </Link>
      </div>
   )
}

function CatchBoundary({ error }: ErrorComponentProps) {
   const router = useRouter()
   const _isRoot = useMatch({
      strict: false,
      select: (state) => state.id === rootRouteId,
   })

   return (
      <div className="flex grow flex-col items-center justify-center pt-20 text-center md:pt-40">
         <h1 className="mb-2 font-semibold text-xl">An error occurred</h1>
         <p className="mb-5 text-lg leading-snug opacity-70">
            Please, try again.
         </p>
         <div className="flex items-center justify-center gap-2.5">
            <Button
               onClick={() => {
                  router.invalidate()
               }}
            >
               Try Again
            </Button>
         </div>
         {import.meta.env.DEV ? (
            <div className="mx-auto mt-12 w-fit">
               <ErrorComponent error={error} />
            </div>
         ) : null}
      </div>
   )
}

declare module "@tanstack/react-router" {
   interface Register {
      router: typeof router
   }
}

// biome-ignore lint/style/noNonNullAssertion: ...
const rootElement = document.getElementById("app")!
if (!rootElement.innerHTML || rootElement.innerHTML.trim().length === 0) {
   const root = ReactDOM.createRoot(rootElement)
   root.render(
      <React.StrictMode>
         <RouterProvider router={router} />
      </React.StrictMode>,
   )
}
