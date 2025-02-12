import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development'
    ? '/'
    : '/chat-gpt-driven-developed-sprint-points-calculator-9000/',
  plugins: [vue()],
})
