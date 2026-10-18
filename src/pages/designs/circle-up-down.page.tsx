import type { ReactNode } from 'react'
import { useState } from 'react'
import { cn } from 'cn'
import { CircleUpDown } from '@/components/CircleUpDown.tsx'

type DemoFrameProps = {
  title: string
  description: string
  className?: string
  children: ReactNode
}

function DemoFrame({ title, description, className, children }: DemoFrameProps) {
  return (
    <figure className="flex min-h-0 flex-col gap-2">
      <figcaption className="shrink-0 text-sm leading-snug">
        <span className="font-medium text-foreground">{title}</span>
        <span className="text-muted-foreground"> — {description}</span>
      </figcaption>
      <div
        className={cn(
          'relative min-h-0 overflow-hidden rounded-lg border border-border bg-muted/25',
          className,
        )}
      >
        {children}
      </div>
    </figure>
  )
}

export default function CircleUpDownPage() {
  const [duration, setDuration] = useState(3)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <label className="relative z-[2] flex shrink-0 flex-col gap-1 border-b border-border bg-background/90 px-5 py-4 text-sm backdrop-blur-sm">
        Duration per movement (s)
        <input
          type="range"
          min={1}
          max={8}
          step={0.5}
          value={duration}
          onChange={(event) => setDuration(Number(event.target.value))}
        />
        <span className="text-muted-foreground tabular-nums">{duration}s</span>
      </label>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0 overflow-y-auto px-5 py-6">
          <p className="mb-6 max-w-prose text-sm text-muted-foreground">
            The circle matches the container width when there is extra height to
            travel; otherwise it fits the container height and stays still.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <DemoFrame
              title="Tall container"
              description="circle is full width; rises and falls in the extra height"
              className="mx-auto h-80 w-full max-w-[11rem]"
            >
              <CircleUpDown duration={duration} />
            </DemoFrame>
            <DemoFrame
              title="Wide, short container"
              description="not tall enough to move; circle fits the container height"
              className="h-28 w-full"
            >
              <CircleUpDown duration={duration} />
            </DemoFrame>
            <DemoFrame
              title="Square container"
              description="height equals width; circle fills the box with no travel"
              className="mx-auto aspect-square w-full max-w-[14rem]"
            >
              <CircleUpDown duration={duration} />
            </DemoFrame>
            <DemoFrame
              title="Moderate height"
              description="full width with a shorter vertical range"
              className="h-56 w-full max-w-md"
            >
              <CircleUpDown duration={duration} />
            </DemoFrame>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col border-t border-border px-5 py-4">
          <DemoFrame
            title="Large container"
            description="fills the space below; width-sized circle with the most travel"
            className="min-h-0 flex-1 w-full"
          >
            <CircleUpDown duration={duration} />
          </DemoFrame>
        </div>
      </div>
    </div>
  )
}
