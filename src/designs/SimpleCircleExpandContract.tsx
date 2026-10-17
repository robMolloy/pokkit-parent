import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { cn } from 'cn'

type SimpleCircleExpandContractProps = {
  className?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function SimpleCircleExpandContract({
  className,
  duration,
}: SimpleCircleExpandContractProps) {
  const phase = duration
  const [expanded, setExpanded] = useState(false)
  const transition = {
    transitionDuration: `${phase}s`,
  } satisfies CSSProperties

  useEffect(() => {
    let intervalId: number | undefined
    let innerFrame: number | undefined

    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        setExpanded(true)
        intervalId = window.setInterval(() => {
          setExpanded((value) => !value)
        }, phase * 1000)
      })
    })

    return () => {
      window.cancelAnimationFrame(outerFrame)
      if (innerFrame !== undefined) {
        window.cancelAnimationFrame(innerFrame)
      }
      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [phase])

  return (
    <div className={cn('relative min-h-[calc(100svh-4.5rem)] flex-1', className)}>
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_64%)]',
          'transition-[width,height] ease-in-out motion-reduce:transition-none',
          expanded ? 'size-[100vw]' : 'size-2',
          'motion-reduce:size-[min(240px,42vw)]',
        )}
        style={transition}
      />
      <p
        className="pointer-events-none fixed top-[calc(50%+clamp(40px,8vh,72px))] left-1/2 z-[1] m-0 grid -translate-x-1/2 place-items-center"
        aria-hidden="true"
      >
        <span
          className={cn(
            'col-start-1 row-start-1 rounded-full border border-foreground/14 bg-background/88 px-[0.95rem] py-[0.45rem] text-[0.95rem] font-medium tracking-[0.16em] text-foreground uppercase backdrop-blur-[10px] transition-opacity ease-in-out motion-reduce:transition-none',
            expanded ? 'opacity-100' : 'opacity-0',
          )}
          style={transition}
        >
          Expand
        </span>
        <span
          className={cn(
            'col-start-1 row-start-1 rounded-full border border-foreground/14 bg-background/88 px-[0.95rem] py-[0.45rem] text-[0.95rem] font-medium tracking-[0.16em] text-foreground uppercase backdrop-blur-[10px] transition-opacity ease-in-out motion-reduce:transition-none motion-reduce:hidden',
            expanded ? 'opacity-0' : 'opacity-100',
          )}
          style={transition}
        >
          Contract
        </span>
      </p>
    </div>
  )
}
