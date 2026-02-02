import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // 1. Import the plugin

export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths() // 2. Add it here
  ],
  // 3. We can remove the manual 'resolve' block because tsconfigPaths 
  // reads your aliases directly from tsconfig.json!
});