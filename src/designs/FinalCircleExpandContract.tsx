import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './FinalCircleExpandContract.css'

const cueClassName =
  'col-start-1 row-start-1 rounded-full border border-foreground/14 bg-background/88 px-[0.95rem] py-[0.45rem] text-[0.95rem] leading-none font-medium tracking-[0.16em] text-foreground uppercase whitespace-nowrap backdrop-blur-[10px]'

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
    '--final-circle-expand-contract-phase': `${phase}s`,
  } as CSSProperties

  return (
    <div className={cn('relative min-h-[calc(100svh-4.5rem)] flex-1', className)}>
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'final-circle-expand-contract-circle pointer-events-none fixed top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full',
          'bg-[radial-gradient(circle_at_50%_42%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_64%)]',
          'motion-reduce:size-[min(240px,42vw)] motion-reduce:animate-none',
        )}
        style={motionTiming}
      />
      <p
        className="pointer-events-none fixed top-[calc(50%+clamp(40px,8vh,72px))] left-1/2 z-[1] m-0 grid -translate-x-1/2 place-items-center"
        aria-hidden="true"
      >
        <span
          className={cn(cueClassName, 'final-circle-expand-contract-cue-expand motion-reduce:animate-none')}
          style={motionTiming}
        >
          Expand
        </span>
        <span
          className={cn(
            cueClassName,
            'final-circle-expand-contract-cue-contract motion-reduce:hidden motion-reduce:animate-none',
          )}
          style={motionTiming}
        >
          Contract
        </span>
      </p>
    </div>
  )
}
