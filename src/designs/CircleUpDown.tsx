import type { CSSProperties } from 'react'
import { cn } from 'cn'

const defaultDuration = 3

const cueClassName =
  'col-start-1 row-start-1 rounded-full border border-foreground/14 bg-background/88 px-[0.95rem] py-[0.45rem] text-[0.95rem] leading-none font-medium tracking-[0.16em] text-foreground uppercase whitespace-nowrap backdrop-blur-[10px]'

type CircleUpDownProps = {
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration?: number
}

function durationSeconds(value: number | undefined) {
  if (value == null || !Number.isFinite(value) || value <= 0) {
    return defaultDuration
  }
  return value
}

export function CircleUpDown({ className, duration }: CircleUpDownProps) {
  const phase = durationSeconds(duration)
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties
  // Negative delay keeps the “Down” cue aligned with the second half of the loop.
  const downCueTiming = {
    ...motionTiming,
    animationDelay: `${-phase}s`,
  } satisfies CSSProperties

  return (
    <div className={cn('relative min-h-[calc(100svh-4.5rem)] flex-1', className)}>
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'pointer-events-none fixed top-1/2 left-1/2 size-32 rounded-full shadow-lg',
          'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          'motion-safe:animate-circle-up-down-tw-float motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:animate-none',
        )}
        style={motionTiming}
      />
      <p
        className="pointer-events-none fixed top-[calc(50%+clamp(40px,8vh,72px))] left-1/2 z-[1] m-0 grid -translate-x-1/2 place-items-center"
        aria-hidden="true"
      >
        <span
          className={cn(
            cueClassName,
            'motion-safe:animate-circle-up-down-tw-cue-up motion-reduce:animate-none',
          )}
          style={motionTiming}
        >
          Up
        </span>
        <span
          className={cn(
            cueClassName,
            'motion-safe:animate-circle-up-down-tw-cue-down motion-reduce:hidden',
          )}
          style={downCueTiming}
        >
          Down
        </span>
      </p>
    </div>
  )
}
