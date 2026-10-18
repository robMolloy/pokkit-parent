import { render, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { startCircleUpDownAnimationDriver } from './circleUpDown.test-driver'
import { CircleUpDown } from './CircleUpDown'

describe('CircleUpDown', () => {
  let stopAnimationDriver: () => void

  beforeAll(() => {
    stopAnimationDriver = startCircleUpDownAnimationDriver()
  })

  afterAll(() => {
    stopAnimationDriver()
  })
  it('sets animation duration to twice the phase length', () => {
    render(<CircleUpDown duration={3} />)
    const circle = document.querySelector('.circle-up-down-circle')
    expect(circle).toBeInTheDocument()
    expect(circle).toHaveStyle({ animationDuration: '6s' })
  })

  it('changes circle position after 0.1 seconds', async () => {
    const { container } = render(<CircleUpDown duration={3} />)
    const circle = container.querySelector('.circle-up-down-circle')
    expect(circle).toBeInTheDocument()

    await new Promise((resolve) => setTimeout(resolve, 20))
    const positionAtStart = getComputedStyle(circle).transform
    await new Promise((resolve) => setTimeout(resolve, 100))
    const positionAfterDelay = getComputedStyle(circle).transform

    expect(positionAfterDelay).not.toBe(positionAtStart)
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
