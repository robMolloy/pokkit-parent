import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'
import { ItemUpDown } from './ItemUpDown'

let resizeObserverCallback: ResizeObserverCallback | undefined

describe('ItemUpDown', () => {
  beforeEach(() => {
    class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback
      }

      observe = vi.fn()
      disconnect = vi.fn()
      unobserve = vi.fn()
    }
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    resizeObserverCallback = undefined
  })

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
      Element.prototype.animate = vi.fn(() => ({ cancel: vi.fn() })) as unknown as Element['animate']
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

    it('measures travel from the expand clip, not the outer payload wrapper', () => {
      const laneHeight = 448
      const expandClipHeight = 288

      const { container } = render(
        <ItemUpDown containerClassName="h-96 travel-lane" duration={2}>
          <ItemExpandContract containerClassName="h-72 inner-clip" duration={2}>
            <div className="h-20 w-full">Nested</div>
          </ItemExpandContract>
        </ItemUpDown>,
      )

      const lane = container.querySelector('.travel-lane') as HTMLElement
      const inner = container.querySelector('.item-expand-contract-clip') as HTMLElement
      const payload = container.querySelector('.shrink-0') as HTMLElement

      Object.defineProperty(lane, 'clientHeight', {
        configurable: true,
        value: laneHeight,
      })
      Object.defineProperty(inner, 'offsetHeight', {
        configurable: true,
        value: expandClipHeight,
      })
      Object.defineProperty(payload, 'offsetHeight', {
        configurable: true,
        value: expandClipHeight + 80,
      })

      resizeObserverCallback?.([], {} as ResizeObserver)

      expect(lane.style.getPropertyValue('--item-up-down-travel')).toBe(
        `${laneHeight - expandClipHeight}px`,
      )
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
