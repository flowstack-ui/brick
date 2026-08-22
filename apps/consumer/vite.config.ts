import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    target: ["chrome120", "edge120", "firefox121", "safari17.2"],
  },
  server: {
    host: "127.0.0.1",
    port: 3011,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4011,
    strictPort: true,
  },
});
