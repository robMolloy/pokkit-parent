import { useState, type ReactNode } from 'react'
import { ItemLeftRight } from '@/components/ItemLeftRight.tsx'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

function ItemUpDownLeftRightDemo({
  duration,
  wrapperClassName,
  containerClassName,
  onCycleComplete,
  onSweepComplete,
  children,
}: {
  duration: number
  wrapperClassName: string
  containerClassName: string
  onCycleComplete?: () => void
  onSweepComplete?: () => void
  children: ReactNode
}) {
  return (
    <ItemUpDown
      className={wrapperClassName}
      containerClassName={containerClassName}
      contentClassName="w-full"
      duration={duration}
    >
      <ItemLeftRight
        className="h-36 w-full"
        containerClassName="rounded-none border-0 bg-transparent shadow-none"
        duration={duration}
        {...(onCycleComplete !== undefined ? { onCycleComplete } : {})}
        {...(onSweepComplete !== undefined ? { onSweepComplete } : {})}
      >
        {children}
      </ItemLeftRight>
    </ItemUpDown>
  )
}

export default function ItemUpDownLeftRightPage() {
  const [duration, setDuration] = useState(3)
  const [sweepCount, setSweepCount] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <div className="flex shrink-0 flex-wrap items-end gap-x-8 gap-y-3 border-b border-border bg-background px-5 py-4 text-sm">
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
      <div className="flex flex-1 flex-col gap-8 px-5 py-8">
        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Default</figcaption>
          <ItemUpDownLeftRightDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            onCycleComplete={() => setCycleCount((count) => count + 1)}
            onSweepComplete={() => setSweepCount((count) => count + 1)}
          >
            <div className={`${childBase} size-32 text-lg`}>Any JSX</div>
          </ItemUpDownLeftRightDemo>
        </figure>
      </div>
    </div>
  )
}
