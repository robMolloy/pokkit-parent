import type { CSSProperties } from 'react'
import { cn } from 'cn'

type CircleUpDownProps = {
  className?: string
  /** Full up-and-down cycle in seconds. */
  duration?: number
}

export function CircleUpDown({ className, duration = 6 }: CircleUpDownProps) {
  const motionTiming =
    duration > 0 && Number.isFinite(duration)
      ? ({ animationDuration: `${duration}s` } satisfies CSSProperties)
      : undefined

  return (
    <div
      className={cn(
        'flex min-h-[calc(100svh-4.5rem)] flex-1 items-center justify-center',
        className,
      )}
    >
      <p className="sr-only">
        A circle slowly rises, then falls. The motion repeats.
      </p>
      <div
        className="size-32 rounded-full bg-[radial-gradient(circle_at_50%_38%,white,var(--foreground)_68%)] shadow-lg motion-safe:animate-circle-up-down motion-reduce:animate-none"
        style={motionTiming}
        aria-hidden="true"
      />
    </div>
  )
}
