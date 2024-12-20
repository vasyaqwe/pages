import { createTable, lifecycleDates, tableId } from "@/db/utils"
import { index, text } from "drizzle-orm/pg-core"

export const note = createTable(
   "note",
   {
      id: tableId("note"),
      title: text().notNull(),
      content: text().notNull().default(""),
      ...lifecycleDates,
   },
   (table) => [index("note_search_idx").on(table.title, table.content)],
)
