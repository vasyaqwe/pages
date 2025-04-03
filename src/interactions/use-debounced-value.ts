import { useUnmount } from "@/interactions/use-unmount"
import * as React from "react"
import { debounce } from "remeda"

type DebounceOptions = {
   leading?: boolean
   trailing?: boolean
   maxWait?: number
}

type ControlFunctions = {
   cancel: () => void
   flush: () => void
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type DebouncedState<T extends (...args: any[]) => any> = ((
   ...args: Parameters<T>
) => Promise<ReturnType<T>> | undefined) &
   ControlFunctions

export function useDebounceCallback<
   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
   T extends (...args: any[]) => any,
>(func: T, delay = 500, options?: DebounceOptions): DebouncedState<T> {
   // Create the debounced function
   const debouncedFunc = React.useMemo(() => {
      const debouncedInstance = debounce(
         async (...args: Parameters<T>) => {
            // Await the provided async function
            return await func(...args)
         },
         {
            waitMs: delay,
            maxWaitMs: options?.maxWait,
         },
      )

      // Wrap the debounced function to include cancel and flush methods
      const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
         return debouncedInstance.call(...args)
      }

      // Attach control methods to the wrapped function
      wrappedFunc.cancel = () => debouncedInstance.cancel()
      wrappedFunc.flush = () => debouncedInstance.flush()

      return wrappedFunc
   }, [func, delay, options])

   // Clean up debounced function on unmount
   useUnmount(() => {
      debouncedFunc.cancel()
   })

   return debouncedFunc
}
