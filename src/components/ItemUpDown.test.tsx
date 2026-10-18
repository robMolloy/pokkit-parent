import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ItemUpDown } from './ItemUpDown'

describe('ItemUpDown', () => {
  const animateMock = vi.fn(() => ({ cancel: vi.fn() }))
  let resizeObserverCallback: ResizeObserverCallback | undefined

  beforeEach(() => {
    animateMock.mockClear()
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    class ResizeObserverMock {
      constructor(callback: ResizeObserverCallback) {
        resizeObserverCallback = callback
        callback([], this as unknown as ResizeObserver)
      }

      observe = vi.fn()
      disconnect = vi.fn()
      unobserve = vi.fn()
    }
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
    Element.prototype.animate = animateMock as unknown as Element['animate']
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    resizeObserverCallback = undefined
  })

  it('animates the child with duration matching one movement phase', () => {
    render(
      <ItemUpDown duration={3}>
        <span data-testid="child">Hello</span>
      </ItemUpDown>,
    )

    expect(animateMock).toHaveBeenCalled()
    const lastCall = animateMock.mock.calls.at(-1) as
      | [Keyframe[], KeyframeAnimationOptions]
      | undefined
    const options = lastCall?.[1]
    expect(options?.duration).toBe(3000)
    expect(options?.direction).toBe('alternate')
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

  it('recomputes animation when the container resizes', () => {
    render(
      <ItemUpDown duration={2}>
        <span>Item</span>
      </ItemUpDown>,
    )

    const callsBefore = animateMock.mock.calls.length
    resizeObserverCallback?.([], {} as ResizeObserver)
    expect(animateMock.mock.calls.length).toBeGreaterThan(callsBefore)
  })
})
