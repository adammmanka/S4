import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
});
