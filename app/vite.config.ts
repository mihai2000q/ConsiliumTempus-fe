import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mapMode.get(mode) ?? '', process.cwd(), 'VITE_')

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_APPLICATION_PORT)
    }
  }
})

const mapMode = new Map<string, string>()
mapMode.set('production', 'prod')
mapMode.set('development', 'dev')
