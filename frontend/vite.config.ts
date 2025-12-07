// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// ⛔ Remove any 'import tailwindcss' line

export default defineConfig({
  plugins: [
    react(),
    // ⛔ Remove 'tailwindcss()' from here
  ],
})