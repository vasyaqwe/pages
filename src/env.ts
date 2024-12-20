export const env = {
   DATABASE_URL: `idb://${import.meta.env.DEV ? "pages-db" : "pages-db-prod"}`,
}
