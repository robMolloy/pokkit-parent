import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemLeftRightMotion } from './ItemLeftRightMotion'

describe('ItemLeftRightMotion', () => {
  it('renders the motion layer and children', () => {
    render(
      <ItemLeftRightMotion duration={3}>
        <span data-testid="child">Hello</span>
      </ItemLeftRightMotion>,
    )
    const motion = document.querySelector('.item-left-right-lib-motion')
    expect(motion).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <ItemLeftRightMotion className="motion-demo" duration={2}>
        <span>Item</span>
      </ItemLeftRightMotion>,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('merges optional className for travel height on the root', () => {
    const { container } = render(
      <ItemLeftRightMotion className="h-40 motion-demo" duration={2}>
        <span>Item</span>
      </ItemLeftRightMotion>,
    )
    expect(container.firstElementChild).toHaveClass('h-40', 'motion-demo')
  })

  it('merges optional containerClassName on the clip region', () => {
    const { container } = render(
      <ItemLeftRightMotion containerClassName="demo-clip" duration={2}>
        <span>Item</span>
      </ItemLeftRightMotion>,
    )
    const clip = container.querySelector('.demo-clip')
    expect(clip).toHaveClass('inset-0', 'overflow-hidden')
  })

  it('describes singular duration in screen-reader text', () => {
    render(
      <ItemLeftRightMotion duration={1}>
        <span>Item</span>
      </ItemLeftRightMotion>,
    )
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(
      <ItemLeftRightMotion duration={2.5}>
        <span>Item</span>
      </ItemLeftRightMotion>,
    )
    expect(
      screen.getByText(/Each movement takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
