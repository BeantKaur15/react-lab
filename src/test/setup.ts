// Adds matchers like toBeInTheDocument() to Vitest's expect().
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Without globals, Testing Library cannot auto-clean, so we do it here.
afterEach(() => {
  cleanup()
})
