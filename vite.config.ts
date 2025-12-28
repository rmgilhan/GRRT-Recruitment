import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Key is the base alias (@components), value is the physical source directory
      // The trailing slash in the key is removed to match how the alias is used in imports
      // e.g., import X from "@components/Y"
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@types": path.resolve(__dirname, "src/types"),
      "@config": path.resolve(__dirname, "src/config"),
      "@interfaces": path.resolve(__dirname, "src/interfaces")
    }
  }
})
