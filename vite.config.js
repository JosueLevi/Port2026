import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // En GitHub Pages la web vive en /Port2026/ (lo pone .github/workflows/deploy.yml); en local y Vercel es "/"
  base: process.env.BASE_PATH || '/',
})
