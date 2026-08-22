import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const playgroundRoot = resolve(process.cwd(), "playground");

export default defineConfig({
  appType: "spa",
  root: playgroundRoot,
  plugins: [react()],
  build: {
    outDir: resolve(playgroundRoot, "dist"),
    emptyOutDir: true,
    target: ["chrome120", "edge120", "firefox121", "safari17.2"],
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
