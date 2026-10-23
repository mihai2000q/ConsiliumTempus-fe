import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
      port: parseInt(env.VITE_APPLICATION_PORT)
    }
  }
})
