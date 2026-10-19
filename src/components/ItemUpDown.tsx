import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'
import './ItemUpDown.css'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip that defines travel distance (default height `h-72`). */
  containerClassName?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function ItemUpDown({
  children,
  className,
  containerClassName,
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
          className="item-up-down-motion absolute inset-x-0 flex justify-center"
          style={motionTiming}
        >
          <div className="w-fit max-w-full shrink-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
