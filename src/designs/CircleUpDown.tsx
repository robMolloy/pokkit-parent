import type { CSSProperties } from 'react'
import { cn } from 'cn'

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
    <div className={cn('relative min-h-[calc(100svh-4.5rem)] flex-1', className)}>
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'pointer-events-none fixed top-1/2 left-1/2 size-32 rounded-full shadow-lg',
          'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          'motion-safe:animate-circle-up-down-tw-float motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:animate-none',
        )}
        style={motionTiming}
      />
    </div>
  )
}
