import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CircleUpDownMotion } from './CircleUpDownMotion'

describe('CircleUpDownMotion', () => {
  it('renders the animated circle', () => {
    render(<CircleUpDownMotion duration={3} />)
    expect(
      document.querySelector('.circle-up-down-motion-circle'),
    ).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <CircleUpDownMotion className="motion-demo" duration={2} />,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('describes singular duration in screen-reader text', () => {
    render(<CircleUpDownMotion duration={1} />)
    expect(
      screen.getByText(/Each inhale or exhale takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(<CircleUpDownMotion duration={2.5} />)
    expect(
      screen.getByText(/Each inhale or exhale takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
