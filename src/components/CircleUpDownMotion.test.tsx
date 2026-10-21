import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CircleUpDownMotion } from './CircleUpDownMotion'

describe('CircleUpDownMotion', () => {
  it('renders the animated circle', () => {
    render(<CircleUpDownMotion />)
    expect(
      document.querySelector('.circle-up-down-motion-circle'),
    ).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <CircleUpDownMotion className="motion-demo" />,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('describes default rise and fall timing in screen-reader text', () => {
    const { container } = render(<CircleUpDownMotion />)
    expect(container.querySelector('.sr-only')).toHaveTextContent(
      'A circle slowly rises as you breathe in over 4 seconds, then falls as you breathe out over 8 seconds, and repeats.',
    )
  })

  it('describes custom rise and fall timing in screen-reader text', () => {
    const { container } = render(
      <CircleUpDownMotion riseDuration={1} fallDuration={2.5} />,
    )
    expect(container.querySelector('.sr-only')).toHaveTextContent(
      'A circle slowly rises as you breathe in over 1 second, then falls as you breathe out over 2.5 seconds, and repeats.',
    )
  })
})
