import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'
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
export function ItemLeftRight(p: {
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
  const motionRef = useRef<HTMLDivElement>(null)
  const sweepCount = useRef(0)

  useEffect(() => {
    const el = motionRef.current
    if (!el) return

    const callbacks: {
      onSweepComplete?: () => void
      onCycleComplete?: () => void
    } = {}
    if (p.onSweepComplete !== undefined) {
      callbacks.onSweepComplete = p.onSweepComplete
    }
    if (p.onCycleComplete !== undefined) {
      callbacks.onCycleComplete = p.onCycleComplete
    }

    const onIteration = (event: AnimationEvent) => {
      if (event.animationName !== 'item-left-right') return

      callbacks.onSweepComplete?.()

      sweepCount.current += 1
      if (sweepCount.current % 2 === 0) {
        callbacks.onCycleComplete?.()
      }
    }

    el.addEventListener('animationiteration', onIteration)
    return () => el.removeEventListener('animationiteration', onIteration)
  }, [p.onCycleComplete, p.onSweepComplete])

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
        <div
          ref={motionRef}
          className="item-left-right-motion absolute inset-y-0 flex items-center"
          style={{ animationDuration: `${p.duration}s` }}
        >
          <div
            className={cn(
              'w-fit max-w-full shrink-0',
              p.contentClassName,
            )}
          >
            {p.children}
          </div>
        </div>
      </div>
    </div>
  )
}
