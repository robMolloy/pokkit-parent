import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './FinalCircleExpandContract.css'

type FinalCircleExpandContractProps = {
  className?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function FinalCircleExpandContract({
  className,
  duration,
}: FinalCircleExpandContractProps) {
  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  return (
    <div className={cn('relative min-h-[calc(100svh-4.5rem)] flex-1', className)}>
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'final-circle-expand-contract-circle pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_64%)]',
        )}
        style={motionTiming}
      />
    </div>
  )
}
