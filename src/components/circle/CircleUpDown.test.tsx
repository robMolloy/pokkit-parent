import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CircleUpDown } from './CircleUpDown'

describe('CircleUpDown', () => {
  it('sets animation duration to twice the phase length', () => {
    render(<CircleUpDown duration={3} />)
    const circle = document.querySelector('.circle-up-down-circle')
    expect(circle).toBeInTheDocument()
    expect(circle).toHaveStyle({ animationDuration: '6s' })
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <CircleUpDown className="motion-demo" duration={2} />,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('describes singular duration in screen-reader text', () => {
    render(<CircleUpDown duration={1} />)
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(<CircleUpDown duration={2.5} />)
    expect(
      screen.getByText(/Each movement takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
