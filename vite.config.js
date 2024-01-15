import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    base: "./",
    // copyPublicDir: false,
  },
  base: "./",
});
// copyPublic is commented out for now (2024.01.15)
// if set to true, files in the public folder are not included in dist
// however, Vite then builds so that that list_data cannot be found, and favicon does not work
// When making new build, do the following:
// 1. npm run build
// 2. Delete data- and media-folder, delete also favicon
// 3. Rename index.html (in dist) to media.html
// 4. Deploy assets and index.html to webserver
// base: "./" may need removal if deploying to root directory. Not sure yet
