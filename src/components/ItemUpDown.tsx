import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'
import './ItemUpDown.css'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip that defines travel distance (default height `h-72`). */
  containerClassName?: string
  /** Classes on the animated motion track (useful for layout debugging). */
  trackClassName?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function ItemUpDown({
  children,
  className,
  containerClassName,
  trackClassName,
  duration,
}: ItemUpDownProps) {
  const phase = duration
  const motionTiming = {
    animationDuration: `${phase}s`,
  } satisfies CSSProperties

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'relative h-72 w-full overflow-hidden',
          containerClassName,
        )}
      >
        <div
          className={cn(
            'item-up-down-motion absolute inset-x-0 top-0 flex h-fit w-full items-start justify-center',
            trackClassName,
          )}
          style={motionTiming}
        >
          <div className="w-fit max-w-full shrink-0 self-start">{children}</div>
        </div>
      </div>
    </div>
  )
}
