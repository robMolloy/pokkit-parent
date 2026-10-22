import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './CircleExpandContract.css'

type CircleExpandContractProps = {
  className?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function CircleExpandContract({
  className,
  duration,
}: CircleExpandContractProps) {
  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  return (
    <div className={cn('relative min-h-0 flex-1', className)}>
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            'circle-expand-contract-circle absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full',
            'bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_64%)]',
            'motion-reduce:size-[min(240px,42vw)]',
          )}
          style={motionTiming}
        />
      </div>
    </div>
  )
}
