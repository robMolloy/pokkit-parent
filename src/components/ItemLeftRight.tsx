import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'
import './ItemLeftRight.css'

export function ItemLeftRight(p: {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip (travel height is set on the root via `className`, default `h-72`). */
  containerClassName?: string
  /** Classes on the slot around children (default shrink-wraps with `w-fit max-w-full shrink-0`). */
  contentClassName?: string
  /** Seconds for one horizontal sweep in either direction (full cycle is twice this). */
  duration: number
  /** Fired after each one-way sweep (right or left) when CSS motion is active. */
  onSweepComplete?: () => void
  /** Fired after each full out-and-back cycle (two sweeps) when CSS motion is active. */
  onCycleComplete?: () => void
}) {
  const motionRef = useRef<HTMLDivElement>(null)
  const sweepCount = useRef(0)

  useEffect(() => {
    const el = motionRef.current
    if (!el) return

    const onIteration = (event: AnimationEvent) => {
      if (event.animationName !== 'item-left-right') return

      p.onSweepComplete?.()

      sweepCount.current += 1
      if (sweepCount.current % 2 === 0) {
        p.onCycleComplete?.()
      }
    }

    el.addEventListener('animationiteration', onIteration)
    return () => el.removeEventListener('animationiteration', onIteration)
  }, [p.onSweepComplete, p.onCycleComplete])

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
