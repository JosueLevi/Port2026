import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // En GitHub Pages la web vive en /Port2026/ (lo pone .github/workflows/deploy.yml); en local y Vercel es "/"
  base: process.env.BASE_PATH || '/',
  // "@/..." apunta a src/ (lo usan los componentes de Rare UI)
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
