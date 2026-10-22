import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './CircleUpDown.css'

type CircleUpDownProps = {
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function CircleUpDown({ className, duration }: CircleUpDownProps) {
  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  return (
    <div className={cn('relative isolate min-h-0 flex-1 overflow-hidden', className)}>
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            'absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full',
            'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
            'circle-up-down-circle',
          )}
          style={motionTiming}
        />
      </div>
    </div>
  )
}
