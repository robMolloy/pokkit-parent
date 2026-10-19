import { render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'
import { ItemUpDown } from './ItemUpDown'

describe('ItemUpDown with nested ItemExpandContract', () => {
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

  it('uses a size container on the travel clip for cqh-based motion', () => {
    const { container } = render(
      <ItemUpDown containerClassName="travel-lane" duration={3}>
        <ItemExpandContract containerClassName="expand-region" duration={3}>
          <div className="h-20 w-full">child</div>
        </ItemExpandContract>
      </ItemUpDown>,
    )

    const clip = container.querySelector('.travel-lane')
    expect(clip).toHaveClass('item-up-down-clip')
    expect(document.querySelector('.item-up-down-motion')).toBeInTheDocument()
  })
})
