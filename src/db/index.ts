import { PGlite } from "@electric-sql/pglite"
import { drizzle } from "drizzle-orm/pglite"
import { env } from "src/env"
import * as schema from "./schema"

export const client = new PGlite(env.DATABASE_URL)

export const db = drizzle({ client, casing: "snake_case", schema })

export type Database = typeof db
