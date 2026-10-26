import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import ttsHandler from './api/tts.js'

function gttsApiPlugin() {
  const middleware = (req, res, next) => {
    if (req.url && req.url.startsWith('/api/tts')) {
      ttsHandler(req, res)
      return
    }
    next()
  }
  return {
    name: 'gtts-api-middleware',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    gttsApiPlugin()
  ],
})
