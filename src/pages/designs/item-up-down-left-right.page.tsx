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
  children,
}: {
  duration: number
  wrapperClassName: string
  containerClassName: string
  children: ReactNode
}) {
  return (
    <ItemUpDown
      className={wrapperClassName}
      containerClassName={containerClassName}
      duration={duration}
    >
      <ItemLeftRight className="w-full" duration={duration}>
        {children}
      </ItemLeftRight>
    </ItemUpDown>
  )
}

export default function ItemUpDownLeftRightPage() {
  const [duration, setDuration] = useState(3)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <label className="relative z-[2] flex flex-col gap-1 border-b border-border bg-background/90 px-5 py-4 text-sm backdrop-blur-sm">
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
      <div className="flex flex-1 flex-col gap-8 px-5 py-8">
        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Default</figcaption>
          <ItemUpDownLeftRightDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
          >
            <div className={`${childBase} size-32 text-lg`}>Any JSX</div>
          </ItemUpDownLeftRightDemo>
        </figure>
      </div>
    </div>
  )
}
