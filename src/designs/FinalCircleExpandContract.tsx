import type { CSSProperties } from 'react'
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
    <div className={className}>
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className="final-circle-expand-contract-circle"
        style={motionTiming}
      />
    </div>
  )
}
