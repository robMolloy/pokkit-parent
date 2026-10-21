/** Must match the `@keyframes` name in `ItemLeftRight.css`. */
export const ITEM_LEFT_RIGHT_ANIMATION_NAME = 'item-left-right'

export type ItemLeftRightMotionCallbacks = {
  onSweepComplete?: () => void
  onCycleComplete?: () => void
}

/**
 * Updates sweep count and invokes completion callbacks after one horizontal
 * sweep (one animation leg out or back).
 */
export function afterItemLeftRightSweep(
  sweepCount: number,
  callbacks: ItemLeftRightMotionCallbacks,
): number {
  callbacks.onSweepComplete?.()

  const nextSweepCount = sweepCount + 1
  if (nextSweepCount % 2 === 0) {
    callbacks.onCycleComplete?.()
  }
  return nextSweepCount
}

/**
 * Updates sweep count and invokes completion callbacks after one CSS
 * `animationiteration` for the horizontal motion keyframes.
 *
 * Returns the new sweep count (unchanged when `animationName` does not match).
 */
export function afterItemLeftRightAnimationIteration(
  animationName: string,
  sweepCount: number,
  callbacks: ItemLeftRightMotionCallbacks,
): number {
  if (animationName !== ITEM_LEFT_RIGHT_ANIMATION_NAME) return sweepCount
  return afterItemLeftRightSweep(sweepCount, callbacks)
}
