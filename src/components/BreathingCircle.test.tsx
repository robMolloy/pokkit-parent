import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { BreathingCircle } from './BreathingCircle'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    useReducedMotion: vi.fn(() => false),
  }
})

describe('BreathingCircle', () => {
  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <BreathingCircle className="motion-demo" riseDuration={6} fallDuration={3} />,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('describes rise and fall timing in screen-reader text', () => {
    render(<BreathingCircle riseDuration={8} fallDuration={4} />)
    expect(
      screen.getByText(
        /A circle slowly rises over 8 seconds, then falls over 4 seconds, and repeats\./,
      ),
    ).toHaveClass('sr-only')
  })

  it('uses singular seconds in screen-reader text when a phase is one second', () => {
    render(<BreathingCircle riseDuration={1} fallDuration={1} />)
    expect(
      screen.getByText(
        /A circle slowly rises over 1 second, then falls over 1 second, and repeats\./,
      ),
    ).toHaveClass('sr-only')
  })

})
