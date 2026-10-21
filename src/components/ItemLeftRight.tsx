import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'
import {
  afterItemLeftRightAnimationIteration,
} from './itemLeftRightMotion'
import './ItemLeftRight.css'

/**
 * Slides `children` horizontally inside a clipped region, easing back and forth forever.
 *
 * Timing vocabulary (matches `duration` and the optional completion callbacks):
 *
 * - **Sweep** — travel in one direction only (for example left edge → right edge, or the
 *   return right → left). One sweep lasts `duration` seconds. Each finished sweep fires
 *   `onSweepComplete` (via the CSS `animationiteration` event on one keyframe leg).
 *
 * - **Cycle** — a full round trip: two sweeps in sequence (out, then back). One cycle
 *   lasts `2 × duration` seconds. Each finished cycle fires `onCycleComplete` (every
 *   second sweep completion).
 *
 * Callbacks run only when the keyframe animation is active (`prefers-reduced-motion: no-preference`).
 */
export type ItemLeftRightProps = {
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
}

export function ItemLeftRight({
  children,
  className,
  containerClassName,
  contentClassName,
  duration,
  onSweepComplete,
  onCycleComplete,
}: ItemLeftRightProps) {
  const motionRef = useRef<HTMLDivElement>(null)
  const sweepCount = useRef(0)

  useEffect(() => {
    const el = motionRef.current
    if (!el) return

    const onIteration = (event: AnimationEvent) => {
      sweepCount.current = afterItemLeftRightAnimationIteration(
        event.animationName,
        sweepCount.current,
        { onCycleComplete, onSweepComplete },
      )
    }

    el.addEventListener('animationiteration', onIteration)
    return () => el.removeEventListener('animationiteration', onIteration)
  }, [onSweepComplete, onCycleComplete])

  return (
    <div className={cn('relative h-72 w-full', className)}>
      <p className="sr-only">
        Content slowly moves right, then left. Each movement takes {duration}{' '}
        {duration === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          containerClassName,
        )}
      >
        <div
          ref={motionRef}
          className="item-left-right-motion absolute inset-y-0 flex items-center"
          style={{ animationDuration: `${duration}s` }}
        >
          <div
            className={cn(
              'w-fit max-w-full shrink-0',
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
