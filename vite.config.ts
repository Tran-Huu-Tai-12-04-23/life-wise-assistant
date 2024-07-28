import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "-": path.resolve(__dirname, "./src/components"),
      "~": path.resolve(__dirname, "./src/pages"),
    },
  },
});
