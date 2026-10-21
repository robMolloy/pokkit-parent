import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

/**
 * Slides `children` horizontally inside a clipped region, easing back and forth forever.
 * Same behavior and props as {@link ItemLeftRight}, driven by Motion instead of CSS keyframes.
 *
 * Timing vocabulary (matches `duration` and the optional completion callbacks):
 *
 * - **Sweep** — travel in one direction only (for example left edge → right edge, or the
 *   return right → left). One sweep lasts `duration` seconds. Each finished sweep fires
 *   `onSweepComplete`.
 *
 * - **Cycle** — a full round trip: two sweeps in sequence (out, then back). One cycle
 *   lasts `2 × duration` seconds. Each finished cycle fires `onCycleComplete` (every
 *   second sweep completion).
 *
 * Callbacks run only when motion is active (`prefers-reduced-motion: no-preference`).
 */
export function ItemLeftRightMotion(p: {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip (travel height is set on the root via `className`, default `h-72`). */
  containerClassName?: string
  /** Classes on the slot around children (default shrink-wraps with `w-fit max-w-full shrink-0`). */
  contentClassName?: string
  /** Seconds for a single sweep (one horizontal leg). A full out-and-back cycle is `2 × duration`. */
  duration: number
  /**
   * Called once each time a **sweep** completes: the item has finished moving in one
   * direction and the animation is about to reverse for the next leg.
   */
  onSweepComplete?: () => void
  /**
   * Called once each time a **cycle** completes: two sweeps in a row (out and back to the
   * starting side). Fires on every second `onSweepComplete` while motion is running.
   */
  onCycleComplete?: () => void
}) {
  const reduceMotion = useReducedMotion()
  const sweepCount = useRef(0)

  const sweepKeyframes = {
    left: ['0%', '100%'],
    x: ['0%', '-100%'],
  }

  const atRest = {
    left: '0%',
    x: '0%',
  }

  const onAnimationComplete = () => {
    if (reduceMotion) return

    p.onSweepComplete?.()

    sweepCount.current += 1
    if (sweepCount.current % 2 === 0) {
      p.onCycleComplete?.()
    }
  }

  return (
    <div className={cn('relative h-72 w-full', p.className)}>
      <p className="sr-only">
        Content slowly moves right, then left. Each movement takes {p.duration}{' '}
        {p.duration === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          p.containerClassName,
        )}
      >
        <motion.div
          className="item-left-right-lib-motion absolute inset-y-0 flex items-center"
          initial={atRest}
          animate={reduceMotion ? atRest : sweepKeyframes}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: p.duration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }
          }
          onAnimationComplete={onAnimationComplete}
        >
          <div
            className={cn(
              'w-fit max-w-full shrink-0',
              p.contentClassName,
            )}
          >
            {p.children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
