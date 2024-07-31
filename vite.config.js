/* eslint-disable no-undef */
import { fileURLToPath, URL  } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({mode}) => {

  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
  plugins: [vue()],
  server: {
    host: process.env.VITE_CLIENT_HOST,
    port: parseInt(process.env.VITE_CLIENT_PORT)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})}
