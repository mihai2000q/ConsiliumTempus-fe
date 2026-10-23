import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react({ babel: { plugins: [['babel-plugin-react-compiler']] } })],
    server: {
      port: parseInt(env.VITE_APPLICATION_PORT)
    }
  }
})