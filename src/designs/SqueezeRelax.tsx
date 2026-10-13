import { cn } from 'cn'

type SqueezeRelaxProps = {
  className?: string
}

export function SqueezeRelax({ className }: SqueezeRelaxProps) {
  return (
    <div
      className={cn(
        'flex min-h-[calc(100svh-4.5rem)] flex-1 items-center justify-center',
        className,
      )}
    >
      <p className="sr-only">
        A ball slowly rises, then falls. The motion repeats.
      </p>
      <div
        className="size-32 rounded-full bg-[radial-gradient(circle_at_50%_38%,white,var(--foreground)_68%)] shadow-lg motion-safe:animate-squeeze-relax"
        aria-hidden="true"
      />
    </div>
  )
}
