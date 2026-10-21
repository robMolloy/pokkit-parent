import { describe, expect, it, vi } from 'vitest'
import {
  ITEM_LEFT_RIGHT_ANIMATION_NAME,
  afterItemLeftRightAnimationIteration,
  afterItemLeftRightSweep,
} from './itemLeftRightMotion'

describe('afterItemLeftRightSweep', () => {
  it('increments sweep count and calls onSweepComplete once per sweep', () => {
    const onSweepComplete = vi.fn()
    const onCycleComplete = vi.fn()

    let sweepCount = 0
    sweepCount = afterItemLeftRightSweep(sweepCount, {
      onCycleComplete,
      onSweepComplete,
    })
    expect(sweepCount).toBe(1)
    expect(onSweepComplete).toHaveBeenCalledTimes(1)
    expect(onCycleComplete).not.toHaveBeenCalled()

    sweepCount = afterItemLeftRightSweep(sweepCount, {
      onCycleComplete,
      onSweepComplete,
    })
    expect(sweepCount).toBe(2)
    expect(onSweepComplete).toHaveBeenCalledTimes(2)
    expect(onCycleComplete).toHaveBeenCalledTimes(1)
  })
})

describe('afterItemLeftRightAnimationIteration', () => {
  it('delegates to afterItemLeftRightSweep for the horizontal keyframes', () => {
    const onSweepComplete = vi.fn()
    const onCycleComplete = vi.fn()

    const sweepCount = afterItemLeftRightAnimationIteration(
      ITEM_LEFT_RIGHT_ANIMATION_NAME,
      0,
      { onCycleComplete, onSweepComplete },
    )
    expect(sweepCount).toBe(1)
    expect(onSweepComplete).toHaveBeenCalledTimes(1)
    expect(onCycleComplete).not.toHaveBeenCalled()
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
