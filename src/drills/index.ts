import type { ComponentType } from 'react'
import Hello from './00-hello/Drill'

export type DrillEntry = {
  id: string
  title: string
  Component: ComponentType
}

// To add a drill: import it above, then add one line here.
export const drills: DrillEntry[] = [
  { id: '00-hello', title: 'Hello counter', Component: Hello },
]
