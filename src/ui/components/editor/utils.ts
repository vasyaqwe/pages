import type { EditorInstance } from "@/ui/components/editor/types"
import { Fragment, type Node } from "@tiptap/pm/model"
import type { EditorView } from "@tiptap/pm/view"

// Get the text before a given position in markdown format
export const getPrevText = (editor: EditorInstance, position: number) => {
   const nodes: Node[] = []
   editor.state.doc.forEach((node, pos) => {
      if (pos >= position) return false
      nodes.push(node)
      return true
   })
   const fragment = Fragment.fromArray(nodes)
   const doc = editor.state.doc.copy(fragment)

   return editor.storage.markdown.serializer.serialize(doc) as string
}

// Get all content from the editor in markdown format
export const getAllContent = (editor: EditorInstance) => {
   const fragment = editor.state.doc.content
   const doc = editor.state.doc.copy(fragment)

   return editor.storage.markdown.serializer.serialize(doc) as string
}

export const isOnFirstLine = (view: EditorView) => {
   const { state } = view
   const { selection } = state
   const pos = selection.from

   const coords = view.coordsAtPos(pos)
   const startCoords = view.coordsAtPos(0)

   return Math.abs(coords.top - startCoords.top) < 5
}
