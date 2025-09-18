import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router"],
          "quill-vendor": ["quill"],
          "markdown-vendor": ["react-markdown"],
          "highlight-vendor": ["highlight.js"],
        },
      },
    },
  },
  server: {
    cors: {
      origin: "*",
    },
  },
});
