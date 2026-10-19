import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'

describe('ItemExpandContract', () => {
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
      <ItemExpandContract duration={3}>
        <span data-testid="child">Hello</span>
      </ItemExpandContract>,
    )

    expect(animateMock).toHaveBeenCalled()
    const lastCall = animateMock.mock.calls.at(-1) as
      | [Keyframe[], KeyframeAnimationOptions]
      | undefined
    const keyframes = lastCall?.[0]
    const options = lastCall?.[1]
    expect(keyframes?.[0]).toMatchObject({ transform: expect.stringContaining('scale(') })
    expect(keyframes?.[1]).toMatchObject({ transform: 'scale(1)' })
    expect(options?.duration).toBe(3000)
    expect(options?.direction).toBe('alternate')
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
    expect(clip).toHaveClass(
      'h-40',
      'overflow-hidden',
      'relative',
      'item-expand-contract-clip',
    )
  })

  it('keeps the scaled layer out of normal layout flow', () => {
    const { container } = render(
      <ItemExpandContract duration={2}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    const clip = container.querySelector('.overflow-hidden')
    const layer = clip?.firstElementChild
    expect(layer).toHaveClass('absolute', 'inset-0')
    expect(layer?.textContent).toBe('Item')
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

  it('recomputes animation when the container resizes', () => {
    render(
      <ItemExpandContract duration={2}>
        <span>Item</span>
      </ItemExpandContract>,
    )

    const callsBefore = animateMock.mock.calls.length
    resizeObserverCallback?.([], {} as ResizeObserver)
    expect(animateMock.mock.calls.length).toBeGreaterThan(callsBefore)
  })
})
