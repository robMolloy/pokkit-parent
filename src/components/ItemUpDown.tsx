import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'
import './ItemUpDown.css'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function ItemUpDown({ children, className, duration }: ItemUpDownProps) {
  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'item-up-down-motion fixed top-1/2 left-1/2',
        )}
        style={motionTiming}
      >
        {children}
      </div>
    </div>
  )
}
