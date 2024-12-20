import { defineConfig } from "drizzle-kit"
import { env } from "./src/env"

export default defineConfig({
   out: "./src/db/migrations",
   schema: "./src/db/schema/index.ts",
   dialect: "postgresql",
   casing: "snake_case",
   dbCredentials: {
      url: env.DATABASE_URL,
   },
})
