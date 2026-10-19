import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemUpDown } from './ItemUpDown'

describe('ItemUpDown', () => {
  it('sets animation duration to one phase (rise or fall)', () => {
    render(
      <ItemUpDown duration={3}>
        <span data-testid="child">Hello</span>
      </ItemUpDown>,
    )
    const motion = document.querySelector('.item-up-down-motion')
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

  it('merges optional trackClassName on the motion track', () => {
    const { container } = render(
      <ItemUpDown trackClassName="z-[1] demo-motion" duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )
    const motion = container.querySelector('.item-up-down-motion')
    expect(motion).toHaveClass('demo-motion', 'h-fit', 'items-start')
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
