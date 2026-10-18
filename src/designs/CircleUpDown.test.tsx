import { render, screen } from '@testing-library/react'
import { CircleUpDown } from '@/designs/CircleUpDown.tsx'

function getCircle(container: HTMLElement) {
  const circle = container.querySelector('.circle-up-down-circle')
  if (!circle) {
    throw new Error('Expected circle-up-down-circle element')
  }
  return circle
}

describe('CircleUpDown', () => {
  it('applies optional className to the wrapper', () => {
    const { container } = render(
      <CircleUpDown duration={2} className="motion-stage" />,
    )
    expect(container.firstElementChild).toHaveClass('motion-stage')
  })

  it('sets animation duration to twice the phase duration', () => {
    const { container } = render(<CircleUpDown duration={3} />)
    expect(getCircle(container)).toHaveStyle({ animationDuration: '6s' })
  })

  it('describes the motion for screen readers with plural seconds', () => {
    render(<CircleUpDown duration={4} />)
    expect(
      screen.getByText(
        /Each movement takes 4 seconds and repeats\./,
      ),
    ).toHaveClass('sr-only')
  })

  it('uses singular second when duration is one', () => {
    render(<CircleUpDown duration={1} />)
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toBeInTheDocument()
  })
})
