import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  server: { port: 5700 },
  build: {
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'main.[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: a =>
          a.names?.some(n => n.endsWith('.css')) ? 'main.[hash].css' : '[name].[hash][extname]',
      },
    },
  },
})
