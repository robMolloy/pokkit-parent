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
  const timing = {
    '--circle-up-down-phase': `${phase}s`,
  } as CSSProperties

  return (
    <div className={cn('circle-up-down', className)} style={timing}>
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div className="circle-up-down-circle" />
    </div>
  )
}
