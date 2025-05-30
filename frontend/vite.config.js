import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    host: true,
    strictPort: true,
    port: 4173,
  },

})
