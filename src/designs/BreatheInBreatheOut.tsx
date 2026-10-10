import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './BreatheInBreatheOut.css'

const dilateSeconds = 3
const dotSize = '8px'

const breatheStyle = {
  '--breathe-dilate': `${dilateSeconds}s`,
  '--breathe-dot': dotSize,
} as CSSProperties

type BreatheInBreatheOutProps = {
  className?: string
}

export function BreatheInBreatheOut({ className }: BreatheInBreatheOutProps) {
  return (
    <div className={cn('breathe', className)} style={breatheStyle}>
      <p className="sr-only">
        Breathe in as the circle expands to the width of the screen, then
        breathe out as it shrinks to a dot. Each movement takes three seconds
        and repeats.
      </p>
      <div className="breathe-circle" />
      <p className="breathe-cue" aria-hidden="true">
        <span className="breathe-cue-in">Breathe in</span>
        <span className="breathe-cue-out">Breathe out</span>
      </p>
    </div>
  )
}
