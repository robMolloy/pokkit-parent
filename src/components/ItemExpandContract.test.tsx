import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'
import { ItemUpDown } from './ItemUpDown'

describe('ItemExpandContract', () => {
  it('sets animation duration to one movement phase', () => {
    render(
      <ItemExpandContract containerClassName="h-40" duration={3}>
        <span data-testid="child">Hello</span>
      </ItemExpandContract>,
    )

    const motion = document.querySelector('.item-expand-contract-motion')
    expect(motion).toBeInTheDocument()
    expect(motion).toHaveStyle({ animationDuration: '3s' })
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('merges optional className on the wrapper', () => {
    const { container } = render(
      <ItemExpandContract className="motion-demo" duration={2}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    expect(container.firstElementChild).toHaveClass('motion-demo')
  })

  it('merges optional containerClassName on the clip region', () => {
    const { container } = render(
      <ItemExpandContract containerClassName="h-40 demo-clip" duration={2}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    const clip = container.querySelector('.demo-clip')
    expect(clip).toHaveClass('h-40', 'overflow-hidden')
  })

  it('describes singular duration in screen-reader text', () => {
    render(
      <ItemExpandContract duration={1}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    expect(
      screen.getByText(/Each movement takes 1 second and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('describes plural duration in screen-reader text', () => {
    render(
      <ItemExpandContract duration={2.5}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    expect(
      screen.getByText(/Each movement takes 2\.5 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })

  it('does not set inline size on the animated element', () => {
    const { container } = render(
      <ItemExpandContract containerClassName="demo-clip" duration={2}>
        <span>Hello</span>
      </ItemExpandContract>,
    )

    const clip = container.querySelector('.demo-clip')
    const animated = clip?.firstElementChild as HTMLElement | null
    expect(clip).toHaveClass('h-auto')
    expect(animated).toBeTruthy()
    expect(animated?.style.width).toBe('')
    expect(animated?.style.height).toBe('')
  })

  it('shrink-wraps the motion slot when nested in ItemUpDown', () => {
    const { container } = render(
      <ItemUpDown duration={2}>
        <ItemExpandContract duration={2}>
          <span data-testid="nested-child">Hello</span>
        </ItemExpandContract>
      </ItemUpDown>,
    )

    const motionSlot = container.querySelector('.item-up-down-motion > div')
    expect(motionSlot).toHaveClass('w-fit', 'shrink-0')
    expect(motionSlot?.firstElementChild).toHaveClass('w-fit')
  })
})
