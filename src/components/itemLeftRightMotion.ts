/** Must match the `@keyframes` name in `ItemLeftRight.css`. */
export const ITEM_LEFT_RIGHT_ANIMATION_NAME = 'item-left-right'

/**
 * Updates sweep count and invokes completion callbacks after one CSS
 * `animationiteration` for the horizontal motion keyframes.
 *
 * Returns the new sweep count (unchanged when `animationName` does not match).
 */
export function afterItemLeftRightAnimationIteration(
  animationName: string,
  sweepCount: number,
  callbacks: {
    onSweepComplete?: () => void
    onCycleComplete?: () => void
  },
): number {
  if (animationName !== ITEM_LEFT_RIGHT_ANIMATION_NAME) return sweepCount

  callbacks.onSweepComplete?.()

  const nextSweepCount = sweepCount + 1
  if (nextSweepCount % 2 === 0) {
    callbacks.onCycleComplete?.()
  }
  return nextSweepCount
}
