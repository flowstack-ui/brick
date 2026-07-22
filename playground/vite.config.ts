import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  root: __dirname,
  plugins: [
    react(),
    {
      name: "brick-preview-spa-fallback",
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const acceptsHtml = request.headers.accept?.includes("text/html");
          const path = request.url?.split("?", 1)[0] ?? "";
          if (request.method === "GET" && acceptsHtml && !path.includes(".")) {
            request.url = "/";
          }
          next();
        });
      },
    },
  ],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "127.0.0.1",
    port: 3010,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4010,
    strictPort: true,
  },
});
