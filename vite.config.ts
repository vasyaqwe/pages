import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

   return {
      plugins: [
         react({
            babel: {
               plugins: [["babel-plugin-react-compiler", {}]],
            },
         }),
         TanStackRouterVite(),
         tsconfigPaths(),
      ],
      optimizeDeps: {
         exclude: ["@electric-sql/pglite"],
      },
      server: {
         port: 3000,
      },
   }
})
