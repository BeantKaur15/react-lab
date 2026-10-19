import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/  and  https://vitest.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom = a pretend browser, so React components can render in tests
    environment: 'jsdom',
    // runs before every test file (adds toBeInTheDocument() and friends)
    setupFiles: ['src/test/setup.ts'],
  },
})
