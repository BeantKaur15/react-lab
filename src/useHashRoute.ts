import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

// "#/00-hello" -> "00-hello", no hash -> ""
export function useHashRoute(): string {
  return useSyncExternalStore(subscribe, () =>
    window.location.hash.replace(/^#\/?/, ''),
  )
}
