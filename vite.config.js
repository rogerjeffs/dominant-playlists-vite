import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true },
  plugins: [react()],
  build: {
    base: "./",
    outDir:"public_html",    
  },
  base: "./",  
});

