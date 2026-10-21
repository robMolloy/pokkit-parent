import { describe, expect, it, vi } from 'vitest'
import {
  ITEM_LEFT_RIGHT_ANIMATION_NAME,
  afterItemLeftRightAnimationIteration,
} from './itemLeftRightMotion'

describe('afterItemLeftRightAnimationIteration', () => {
  it('increments sweep count and calls onSweepComplete once per matching iteration', () => {
    const onSweepComplete = vi.fn()
    const onCycleComplete = vi.fn()

    let sweepCount = 0
    sweepCount = afterItemLeftRightAnimationIteration(
      ITEM_LEFT_RIGHT_ANIMATION_NAME,
      sweepCount,
      { onCycleComplete, onSweepComplete },
    )
    expect(sweepCount).toBe(1)
    expect(onSweepComplete).toHaveBeenCalledTimes(1)
    expect(onCycleComplete).not.toHaveBeenCalled()

    sweepCount = afterItemLeftRightAnimationIteration(
      ITEM_LEFT_RIGHT_ANIMATION_NAME,
      sweepCount,
      { onCycleComplete, onSweepComplete },
    )
    expect(sweepCount).toBe(2)
    expect(onSweepComplete).toHaveBeenCalledTimes(2)
    expect(onCycleComplete).toHaveBeenCalledTimes(1)
  })

  it('leaves sweep count and callbacks unchanged for other animation names', () => {
    const onSweepComplete = vi.fn()
    const onCycleComplete = vi.fn()

    const sweepCount = afterItemLeftRightAnimationIteration(
      'other-animation',
      3,
      { onCycleComplete, onSweepComplete },
    )
    expect(sweepCount).toBe(3)
    expect(onSweepComplete).not.toHaveBeenCalled()
    expect(onCycleComplete).not.toHaveBeenCalled()
  })
})
