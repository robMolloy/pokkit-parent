import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ItemExpandContract } from './ItemExpandContract'

describe('ItemExpandContract', () => {
  it('sets animation duration to twice the phase length', () => {
    render(
      <ItemExpandContract duration={4}>
        <span data-testid="child">Hello</span>
      </ItemExpandContract>,
    )
    const motion = document.querySelector('.item-expand-contract-motion')
    expect(motion).toBeInTheDocument()
    expect(motion).toHaveStyle({ animationDuration: '8s' })
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
      <ItemExpandContract duration={3}>
        <span>Item</span>
      </ItemExpandContract>,
    )
    expect(
      screen.getByText(/Each movement takes 3 seconds and repeats\./),
    ).toHaveClass('sr-only')
  })
})
