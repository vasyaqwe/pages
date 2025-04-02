import { createTable, tableId, timestamps } from "@/database/utils"
import type { InferSelectModel } from "drizzle-orm"
import { index, text } from "drizzle-orm/pg-core"

export const note = createTable(
   "note",
   {
      id: tableId("note"),
      title: text().notNull(),
      content: text().notNull().default(""),
      ...timestamps,
   },
   (table) => [index("note_search_idx").on(table.title, table.content)],
)

export type Note = InferSelectModel<typeof note>
