import { cn } from 'cn'

type CircleUpDownProps = {
  className?: string
}

export function CircleUpDown({ className }: CircleUpDownProps) {
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
        className="size-32 rounded-full bg-[radial-gradient(circle_at_50%_38%,white,var(--foreground)_68%)] shadow-lg motion-safe:animate-circle-up-down"
        aria-hidden="true"
      />
    </div>
  )
}
