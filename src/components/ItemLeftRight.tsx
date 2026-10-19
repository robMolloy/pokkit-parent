import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'
import './ItemLeftRight.css'

type ItemLeftRightProps = {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip that defines travel distance (default height `h-72`). */
  containerClassName?: string
  /** Classes on the slot around children (default shrink-wraps with `w-fit max-w-full shrink-0`). */
  contentClassName?: string
  /** Seconds for one horizontal sweep in either direction (full cycle is twice this). */
  duration: number
}

export function ItemLeftRight({
  children,
  className,
  containerClassName,
  contentClassName,
  duration,
}: ItemLeftRightProps) {
  const phase = duration
  const motionTiming = {
    animationDuration: `${phase}s`,
  } satisfies CSSProperties

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly moves right, then left. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'relative h-72 w-full overflow-hidden',
          containerClassName,
        )}
      >
        <div
          className="item-left-right-motion absolute inset-y-0 flex items-center"
          style={motionTiming}
        >
          <div
            className={cn(
              'w-fit max-w-full shrink-0',
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
