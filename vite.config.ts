import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: ["module"],
    alias: {
      "~/": path.resolve(__dirname, "./app/"),
      "~/uikit": path.resolve(__dirname, "./app/uikit"),
    },
  },
});
