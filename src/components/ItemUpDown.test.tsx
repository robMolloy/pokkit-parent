import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemLeftRight } from './ItemLeftRight'
import { ItemUpDown } from './ItemUpDown'

describe('ItemUpDown', () => {
  it('sets animation duration to one phase (rise or fall)', () => {
    const { container } = render(
      <ItemUpDown duration={3}>
        <span data-testid="child">Hello</span>
      </ItemUpDown>,
    )
    const motion = container.querySelector('.item-up-down-motion')
    expect(motion).toBeInTheDocument()
    expect(motion).toHaveStyle({ animationDuration: '3s' })
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <ItemUpDown className="motion-demo" duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('merges optional containerClassName on the clip region', () => {
    const { container } = render(
      <ItemUpDown containerClassName="h-40 demo-clip" duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )
    const clip = container.querySelector('.demo-clip')
    expect(clip).toHaveClass('h-40', 'overflow-hidden')
  })

  it('describes singular duration in screen-reader text', () => {
    render(
      <ItemUpDown duration={1}>
        <span>Item</span>
      </ItemUpDown>,
    )
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('nests ItemLeftRight with full width and shorter height for vertical travel', () => {
    const { container } = render(
      <ItemUpDown contentClassName="w-full" duration={2}>
        <ItemLeftRight className="h-36 w-full" duration={2}>
          <span data-testid="nested-child">Hello</span>
        </ItemLeftRight>
      </ItemUpDown>,
    )

    const upDownMotion = container.querySelector('.item-up-down-motion')
    const motionSlot = upDownMotion?.firstElementChild
    const leftRightRoot = motionSlot?.firstElementChild

    expect(upDownMotion).not.toHaveClass('h-full')
    expect(motionSlot).toHaveClass('w-full')
    expect(leftRightRoot).toHaveClass('h-36', 'w-full')
    expect(screen.getByTestId('nested-child')).toBeInTheDocument()
  })

  it('describes plural duration in screen-reader text', () => {
    render(
      <ItemUpDown duration={2.5}>
        <span>Item</span>
      </ItemUpDown>,
    )
    expect(
      screen.getByText(/Each movement takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
