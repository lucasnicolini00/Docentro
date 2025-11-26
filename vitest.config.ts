// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
})