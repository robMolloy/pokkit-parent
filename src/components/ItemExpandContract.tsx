import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'
import './ItemExpandContract.css'

type ItemExpandContractProps = {
  children: ReactNode
  className?: string
  /** Classes on the clip region (default shrink-wraps content). */
  containerClassName?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function ItemExpandContract({
  children,
  className,
  containerClassName,
  duration,
}: ItemExpandContractProps) {
  const phase = duration
  const motionTiming = {
    animationDuration: `${phase}s`,
  } satisfies CSSProperties

  return (
    <div className={cn('w-fit max-w-full', className)}>
      <p className="sr-only">
        Content slowly expands to its natural size, then contracts. Each
        movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and
        repeats.
      </p>
      <div
        className={cn(
          'mx-auto flex h-auto w-fit max-w-full items-center justify-center overflow-hidden',
          containerClassName,
        )}
      >
        <div
          className="item-expand-contract-motion origin-center will-change-transform motion-reduce:scale-100"
          style={motionTiming}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
