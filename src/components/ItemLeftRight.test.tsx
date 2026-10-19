import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemLeftRight } from './ItemLeftRight'

describe('ItemLeftRight', () => {
  it('sets animation duration to one phase (right or left sweep)', () => {
    render(
      <ItemLeftRight duration={3}>
        <span data-testid="child">Hello</span>
      </ItemLeftRight>,
    )
    const motion = document.querySelector('.item-left-right-motion')
    expect(motion).toBeInTheDocument()
    expect(motion).toHaveStyle({ animationDuration: '3s' })
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <ItemLeftRight className="motion-demo" duration={2}>
        <span>Item</span>
      </ItemLeftRight>,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('merges optional className for travel height on the root', () => {
    const { container } = render(
      <ItemLeftRight className="h-40 motion-demo" duration={2}>
        <span>Item</span>
      </ItemLeftRight>,
    )
    expect(container.firstElementChild).toHaveClass('h-40', 'motion-demo')
  })

  it('merges optional containerClassName on the clip region', () => {
    const { container } = render(
      <ItemLeftRight containerClassName="demo-clip" duration={2}>
        <span>Item</span>
      </ItemLeftRight>,
    )
    const clip = container.querySelector('.demo-clip')
    expect(clip).toHaveClass('inset-0', 'overflow-hidden')
  })

  it('describes singular duration in screen-reader text', () => {
    render(
      <ItemLeftRight duration={1}>
        <span>Item</span>
      </ItemLeftRight>,
    )
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(
      <ItemLeftRight duration={2.5}>
        <span>Item</span>
      </ItemLeftRight>,
    )
    expect(
      screen.getByText(/Each movement takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
