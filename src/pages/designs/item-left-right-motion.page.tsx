import { useState } from 'react'
import { ItemLeftRightMotion } from '@/components/ItemLeftRightMotion.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const examples = [
  {
    label: 'Compact',
    description: 'h-32 · max-w-xs',
    wrapperClassName: 'h-32 w-full max-w-xs',
    containerClassName: clipBorder,
    childClassName: 'size-16 text-sm',
  },
  {
    label: 'Medium',
    description: 'h-48 · max-w-sm',
    wrapperClassName: 'h-48 w-full max-w-sm',
    containerClassName: clipBorder,
    childClassName: 'size-24 text-base',
  },
  {
    label: 'Default',
    description: 'h-72 · max-w-md',
    wrapperClassName: 'h-72 w-full max-w-md',
    containerClassName: clipBorder,
    childClassName: 'size-32 text-lg',
  },
  {
    label: 'Wide',
    description: 'h-36 · full width',
    wrapperClassName: 'h-36 w-full',
    containerClassName: clipBorder,
    childClassName: 'h-20 w-40 text-sm',
  },
  {
    label: 'Narrow',
    description: 'h-48 · max-w-[10rem]',
    wrapperClassName: 'h-48 w-full max-w-[10rem]',
    containerClassName: clipBorder,
    childClassName: 'size-20 text-sm',
  },
  {
    label: 'Short travel',
    description: 'h-72 · max-w-[8rem]',
    wrapperClassName: 'h-72 w-full max-w-[8rem]',
    containerClassName: clipBorder,
    childClassName: 'size-24 text-base',
  },
] as const

export default function ItemLeftRightMotionPage() {
  const [duration, setDuration] = useState(3)
  const [sweepCount, setSweepCount] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <div className="relative z-[2] flex flex-wrap items-end gap-x-8 gap-y-3 border-b border-border bg-background/90 px-5 py-4 text-sm backdrop-blur-sm">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1">
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
        <dl className="flex gap-8">
          <div>
            <dt className="text-muted-foreground">Sweeps</dt>
            <dd className="text-lg font-medium tabular-nums">{sweepCount}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Cycles</dt>
            <dd className="text-lg font-medium tabular-nums">{cycleCount}</dd>
          </div>
        </dl>
      </div>
      <div className="grid flex-1 gap-8 px-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <figure
            key={example.label}
            className="flex flex-col gap-3"
          >
            <figcaption className="text-sm">
              <span className="font-medium">{example.label}</span>
              <span className="text-muted-foreground"> — {example.description}</span>
              {example.label === 'Default' ? (
                <span className="text-muted-foreground">
                  {' '}
                  · header counters track this layout
                </span>
              ) : null}
            </figcaption>
            <ItemLeftRightMotion
              className={example.wrapperClassName}
              containerClassName={example.containerClassName}
              duration={duration}
              {...(example.label === 'Default'
                ? {
                    onCycleComplete: () =>
                      setCycleCount((count) => count + 1),
                    onSweepComplete: () =>
                      setSweepCount((count) => count + 1),
                  }
                : {})}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm ${example.childClassName}`}
              >
                Any JSX
              </div>
            </ItemLeftRightMotion>
          </figure>
        ))}
      </div>
    </div>
  )
}
