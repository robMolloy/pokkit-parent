import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { cn } from 'cn'
import './CircleUpDown.css'

type CircleUpDownProps = {
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

export function CircleUpDown({ className, duration }: CircleUpDownProps) {
  const phase = duration
  const cycle = phase * 2
  const circleRef = useRef<HTMLDivElement>(null)
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  useEffect(() => {
    if (import.meta.env.MODE !== 'test') {
      return
    }

    const circle = circleRef.current
    if (!circle) {
      return
    }

    const phaseMs = phase * 1000
    const cycleMs = phaseMs * 2
    const start = performance.now()

    const tick = () => {
      const elapsed = (performance.now() - start) % cycleMs
      const segment = elapsed / phaseMs
      const progress =
        segment <= 1 ? easeInOut(segment) : easeInOut(2 - segment)
      circle.style.transform = `translate(-50%, calc(-50% - ${progress * 100}px))`
    }

    tick()
    const intervalId = setInterval(tick, 16)
    return () => clearInterval(intervalId)
  }, [phase])

  return (
    <div className={className}>
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        ref={circleRef}
        className={cn(
          'fixed top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          'circle-up-down-circle',
        )}
        style={motionTiming}
      />
    </div>
  )
}
