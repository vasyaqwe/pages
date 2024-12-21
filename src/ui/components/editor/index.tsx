import { cn } from "@/ui/utils"
import { EditorProvider, useEditor } from "@tiptap/react"
import type { EditorProviderProps } from "@tiptap/react"
import * as React from "react"

export type EditorProps = {
   children: React.ReactNode
   className?: string
}

type EditorRootProps = {
   children: React.ReactNode
}

export function EditorRoot({ children }: EditorRootProps) {
   return children
}

export type EditorContentProps = Omit<EditorProviderProps, "content"> & {
   children?: React.ReactNode
   className?: string
   content?: string
   placeholder?: string
}

export const EditorContent = React.forwardRef<
   HTMLDivElement,
   EditorContentProps
>(
   (
      {
         className,
         children,
         content,
         onUpdate,
         placeholder = "",
         editorProps,
         ...props
      },
      ref,
   ) => {
      const editor = useEditor({
         content,
         ...props,
      })

      const classAttr =
         editorProps?.attributes && "class" in editorProps.attributes
            ? editorProps?.attributes.class
            : ""

      const baseClassName = cn(
         "prose mt-2 min-h-9 w-full max-w-full break-words prose-img:m-0 prose-p:my-2 prose-h2:mt-0 prose-h1:mb-3 prose-h2:mb-3 prose-p:leading-normal",
         "prose-code:after:hidden prose-code:before:hidden prose-ol:pl-4 prose-ol:pl-[1.675rem] prose-h3:font-bold prose-code:text-sm prose-h1:text-2xl prose-strong:text-foreground",
         "prose-h2:text-xl prose-h3:text-lg prose-headings:text-foreground prose-p:text-base prose-p:text-foreground focus:outline-hidden",
         "prose-hr:my-4",
      )

      return (
         <div
            ref={ref}
            className={cn("w-full", className)}
         >
            {editor === null ? (
               <>
                  {content === "<p></p>" || content === "" ? (
                     <p
                        className={cn(
                           baseClassName,
                           "text-base text-foreground/40",
                           classAttr,
                        )}
                     >
                        {placeholder}
                     </p>
                  ) : (
                     <div
                        className={cn(baseClassName, classAttr)}
                        dangerouslySetInnerHTML={{
                           __html:
                              content?.replaceAll(
                                 "<p></p>",
                                 "<p><br class='ProseMirror-trailingBreak'></p>",
                              ) ?? "",
                        }}
                     />
                  )}
               </>
            ) : (
               <EditorProvider
                  {...props}
                  onUpdate={({ editor, transaction }) => {
                     onUpdate?.({ editor, transaction })
                  }}
                  editorProps={{
                     ...editorProps,

                     handleDOMEvents: {
                        ...editorProps?.handleDOMEvents,
                     },
                     attributes: {
                        ...editorProps?.attributes,
                        class: cn(baseClassName, classAttr),
                     },
                  }}
                  content={content}
               >
                  {children}
               </EditorProvider>
            )}
         </div>
      )
   },
)
