import { render, screen } from '@testing-library/react'
import { CircleExpandContract } from '@/designs/CircleExpandContract.tsx'

function getCircle(container: HTMLElement) {
  const circle = container.querySelector('.circle-expand-contract-circle')
  if (!circle) {
    throw new Error('Expected circle-expand-contract-circle element')
  }
  return circle
}

describe('CircleExpandContract', () => {
  it('applies optional className to the wrapper', () => {
    const { container } = render(
      <CircleExpandContract duration={2} className="motion-stage" />,
    )
    expect(container.firstElementChild).toHaveClass('motion-stage')
  })

  it('sets animation duration to twice the phase duration', () => {
    const { container } = render(<CircleExpandContract duration={5} />)
    expect(getCircle(container)).toHaveStyle({ animationDuration: '10s' })
  })

  it('describes the motion for screen readers with plural seconds', () => {
    render(<CircleExpandContract duration={2} />)
    expect(
      screen.getByText(
        /Each movement takes 2 seconds and repeats\./,
      ),
    ).toHaveClass('sr-only')
  })

  it('uses singular second when duration is one', () => {
    render(<CircleExpandContract duration={1} />)
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toBeInTheDocument()
  })
})
