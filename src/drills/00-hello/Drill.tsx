import { useState } from 'react'

export default function Drill() {
  const [count, setCount] = useState(0)

  return (
    <section>
      <h2>Hello drill</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </section>
  )
}
