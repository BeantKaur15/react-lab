import { drills } from './drills'
import { useHashRoute } from './useHashRoute'

export default function App() {
  const route = useHashRoute()
  const drill = drills.find((d) => d.id === route)

  if (drill) {
    return (
      <main>
        <p>
          <a href="#/">&larr; All drills</a>
        </p>
        <drill.Component />
      </main>
    )
  }

  return (
    <main>
      <h1>react-lab</h1>
      <ul>
        {drills.map((d) => (
          <li key={d.id}>
            <a href={`#/${d.id}`}>
              {d.id} &mdash; {d.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
