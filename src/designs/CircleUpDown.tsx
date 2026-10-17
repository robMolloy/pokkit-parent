import type { CSSProperties } from 'react'
import { cn } from 'cn'
import { circleExpandContractDurationSeconds } from '@/designs/circleExpandContractAnimation.ts'

type CircleUpDownProps = {
  className?: string
  /** One full up-and-down cycle in seconds. */
  duration?: number
}

export function CircleUpDown({ className, duration }: CircleUpDownProps) {
  const cycle = circleExpandContractDurationSeconds(duration) * 2
  const motionStyle = {
    '--circle-up-down-duration': `${cycle}s`,
  } as CSSProperties

  return (
    <div
      className={cn(
        'flex min-h-[calc(100svh-4.5rem)] flex-1 items-center justify-center',
        className,
      )}
      style={motionStyle}
    >
      <p className="sr-only">
        A circle slowly rises, then falls. The motion repeats.
      </p>
      <div
        className="size-32 rounded-full bg-[radial-gradient(circle_at_50%_38%,white,var(--foreground)_68%)] shadow-lg motion-safe:animate-circle-up-down motion-reduce:animate-none"
        aria-hidden="true"
      />
    </div>
  )
}
