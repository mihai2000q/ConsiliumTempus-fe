import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  console.log(env)

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.VITE_APPLICATION_PORT)
    }
  }
})