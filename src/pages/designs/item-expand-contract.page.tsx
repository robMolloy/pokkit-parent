import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const examples = [
  {
    label: 'Compact',
    description: 'max-w-xs',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName:
      'rounded-xl border border-dashed border-border bg-muted/30 px-6 py-8',
    childClassName: 'size-16 text-sm',
  },
  {
    label: 'Medium',
    description: 'max-w-sm',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName:
      'rounded-xl border border-dashed border-border bg-muted/30 px-8 py-10',
    childClassName: 'size-24 text-base',
  },
  {
    label: 'Default',
    description: 'max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName:
      'rounded-xl border border-dashed border-border bg-muted/30 px-10 py-12',
    childClassName: 'size-32 text-lg',
  },
  {
    label: 'Wide & short',
    description: 'full width',
    wrapperClassName: 'w-full',
    containerClassName:
      'rounded-xl border border-dashed border-border bg-muted/30 px-8 py-6',
    childClassName: 'h-20 w-40 text-sm',
  },
  {
    label: 'Narrow & tall',
    description: 'max-w-[10rem]',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName:
      'rounded-xl border border-dashed border-border bg-muted/30 px-4 py-12',
    childClassName: 'size-20 text-sm',
  },
] as const

export default function ItemExpandContractPage() {
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
            <ItemExpandContract
              className={example.wrapperClassName}
              containerClassName={example.containerClassName}
              duration={duration}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm ${example.childClassName}`}
              >
                Any JSX
              </div>
            </ItemExpandContract>
          </figure>
        ))}
      </div>
    </div>
  )
}
