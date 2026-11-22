import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// `yarn dev`  -> .env.local (http://localhost:<port>)
// `yarn dist` -> .env.prd   (https://tuantla.github.io/<subfolder>), via `--mode prd`
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, 'VITE_')
  const url = new URL(env.VITE_PUBLIC_URL)

  return {
    plugins: [react(), tailwindcss()],
    // localhost -> '/', github pages -> '/jsonviewer/'
    base: url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`,
    server: { port: Number(url.port) || undefined, strictPort: true },
  }
})
