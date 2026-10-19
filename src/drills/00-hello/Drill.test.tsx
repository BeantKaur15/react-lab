import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Drill from './Drill'

describe('00-hello Drill', () => {
  it('renders with a count of 0', () => {
    render(<Drill />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Increment' }),
    ).toBeInTheDocument()
  })

  it('increments when the button is clicked', async () => {
    const user = userEvent.setup()
    render(<Drill />)
    await user.click(screen.getByRole('button', { name: 'Increment' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
})
