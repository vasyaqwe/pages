// vite.config.ts
import { TanStackRouterVite } from "file:///F:/webdev/projects/pages/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import react from "file:///F:/webdev/projects/pages/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///F:/webdev/projects/pages/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///F:/webdev/projects/pages/node_modules/vite-tsconfig-paths/dist/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react(), TanStackRouterVite(), tsconfigPaths()],
    optimizeDeps: {
      exclude: ["@electric-sql/pglite"]
    },
    server: {
      port: 3e3
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3ZWJkZXZcXFxccHJvamVjdHNcXFxccGFnZXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHdlYmRldlxcXFxwcm9qZWN0c1xcXFxwYWdlc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovd2ViZGV2L3Byb2plY3RzL3BhZ2VzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIlxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gICBwcm9jZXNzLmVudiA9IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgfVxuXG4gICByZXR1cm4ge1xuICAgICAgcGx1Z2luczogW3JlYWN0KCksIFRhblN0YWNrUm91dGVyVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICAgICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAgICBleGNsdWRlOiBbXCJAZWxlY3RyaWMtc3FsL3BnbGl0ZVwiXSxcbiAgICAgIH0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICB9LFxuICAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1EsU0FBUywwQkFBMEI7QUFDclMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sbUJBQW1CO0FBRzFCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3ZDLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFFaEUsU0FBTztBQUFBLElBQ0osU0FBUyxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsR0FBRyxjQUFjLENBQUM7QUFBQSxJQUN4RCxjQUFjO0FBQUEsTUFDWCxTQUFTLENBQUMsc0JBQXNCO0FBQUEsSUFDbkM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNMLE1BQU07QUFBQSxJQUNUO0FBQUEsRUFDSDtBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==