import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CircleExpandContract } from './CircleExpandContract'

describe('CircleExpandContract', () => {
  it('sets animation duration to twice the phase length', () => {
    render(<CircleExpandContract duration={4} />)
    const circle = document.querySelector('.circle-expand-contract-circle')
    expect(circle).toBeInTheDocument()
    expect(circle).toHaveStyle({ animationDuration: '8s' })
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <CircleExpandContract className="motion-demo" duration={2} />,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('describes singular duration in screen-reader text', () => {
    render(<CircleExpandContract duration={1} />)
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(<CircleExpandContract duration={3} />)
    expect(
      screen.getByText(/Each movement takes 3 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
