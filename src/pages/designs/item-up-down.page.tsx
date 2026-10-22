import { useState } from 'react'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

const examples = [
  {
    label: 'Compact',
    description: 'h-32 · max-w-xs',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: 'h-32 rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'size-16 text-sm',
  },
  {
    label: 'Medium',
    description: 'h-48 · max-w-sm',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: 'h-48 rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'size-24 text-base',
  },
  {
    label: 'Default',
    description: 'h-72 · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: 'h-72 rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'size-32 text-lg',
  },
  {
    label: 'Tall',
    description: 'h-[28rem] · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName:
      'h-[28rem] rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'size-32 text-lg',
  },
  {
    label: 'Wide & short',
    description: 'h-36 · full width',
    wrapperClassName: 'w-full',
    containerClassName: 'h-36 rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'h-20 w-40 text-sm',
  },
  {
    label: 'Narrow & tall',
    description: 'h-96 · max-w-[10rem]',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName: 'h-96 rounded-xl border border-dashed border-border bg-muted/30',
    childClassName: 'size-20 text-sm',
  },
] as const

export default function ItemUpDownPage() {
  const [duration, setDuration] = useState(3)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <label className="flex shrink-0 flex-col gap-1 border-b border-border bg-background px-5 py-4 text-sm">
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
      <div className="grid flex-1 gap-8 px-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example) => (
          <figure
            key={example.label}
            className="flex flex-col gap-3"
          >
            <figcaption className="text-sm">
              <span className="font-medium">{example.label}</span>
              <span className="text-muted-foreground"> — {example.description}</span>
            </figcaption>
            <ItemUpDown
              className={example.wrapperClassName}
              containerClassName={example.containerClassName}
              duration={duration}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm ${example.childClassName}`}
              >
                Any JSX
              </div>
            </ItemUpDown>
          </figure>
        ))}
      </div>
    </div>
  )
}
