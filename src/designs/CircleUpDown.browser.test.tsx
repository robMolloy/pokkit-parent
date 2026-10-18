import { render } from 'vitest-browser-react'
import { describe, expect, it } from 'vitest'
import { CircleUpDown } from './CircleUpDown'

describe('CircleUpDown motion', () => {
  it('moves the circle after 0.1 seconds', async () => {
    await render(<CircleUpDown duration={3} />)

    const circle = document.querySelector('.circle-up-down-circle')
    if (!circle) {
      throw new Error('Expected circle-up-down-circle element')
    }

    const before = circle.getBoundingClientRect().top
    await new Promise((resolve) => setTimeout(resolve, 100))
    const after = circle.getBoundingClientRect().top

    expect(after).not.toBe(before)
  })
})
