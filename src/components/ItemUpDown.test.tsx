import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'
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

  it('merges optional containerClassName on the clip region', () => {
    const { container } = render(
      <ItemUpDown containerClassName="h-40 demo-clip" duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )
    const clip = container.querySelector('.demo-clip')
    expect(clip).toHaveClass('h-40', 'overflow-hidden', 'item-up-down-clip')
  })

  it('anchors vertical motion at the top of the travel lane', () => {
    render(
      <ItemUpDown duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )
    const motion = document.querySelector('.item-up-down-motion')
    expect(motion).toHaveClass('top-0')
  })

  describe('nested ItemExpandContract', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'matchMedia',
        vi.fn().mockImplementation((query: string) => ({
          matches: false,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      )
      class ResizeObserverMock {
        observe = vi.fn()
        disconnect = vi.fn()
        unobserve = vi.fn()
      }
      vi.stubGlobal('ResizeObserver', ResizeObserverMock)
      Element.prototype.animate = vi.fn(() => ({ cancel: vi.fn() })) as unknown as Element['animate']
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('allows expand content to travel when the lane is taller than the inner clip', () => {
      render(
        <ItemUpDown containerClassName="h-96 travel-lane" duration={2}>
          <ItemExpandContract containerClassName="h-72 inner-clip" duration={2}>
            <span data-testid="nested">Nested</span>
          </ItemExpandContract>
        </ItemUpDown>,
      )

      const lane = document.querySelector('.travel-lane')
      const inner = document.querySelector('.inner-clip')
      expect(lane).toHaveClass('item-up-down-clip', 'h-96')
      expect(inner).toHaveClass('h-72')
      expect(screen.getByTestId('nested')).toBeInTheDocument()
    })
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
