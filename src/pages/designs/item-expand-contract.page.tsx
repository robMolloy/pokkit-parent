import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const containerClassName =
  'h-72 rounded-xl border border-dashed border-border bg-muted/30'

const examples = [
  {
    label: 'Full width at rest',
    description:
      'Child is 100% of container width and a fixed partial height (horizontal bar). Uniform scale collapses to a dot in X and Y, then returns to this shape.',
    wrapperClassName: 'w-full max-w-md',
    childClassName:
      'flex h-20 w-full items-center justify-center rounded-2xl border border-border bg-card text-sm font-medium shadow-sm',
  },
  {
    label: 'Full height at rest',
    description:
      'Child is 100% of container height and a fixed partial width (vertical strip). Same uniform scale: rest size → dot → rest.',
    wrapperClassName: 'w-full max-w-md',
    childClassName:
      'flex h-full w-24 items-center justify-center rounded-2xl border border-border bg-card text-sm font-medium shadow-sm',
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
      <div className="grid flex-1 gap-10 px-5 py-8 sm:grid-cols-2">
        {examples.map((example) => (
          <figure key={example.label} className="flex flex-col gap-3">
            <figcaption className="text-sm">
              <span className="font-medium">{example.label}</span>
              <span className="text-muted-foreground"> — {example.description}</span>
            </figcaption>
            <ItemExpandContract
              className={example.wrapperClassName}
              containerClassName={containerClassName}
              duration={duration}
            >
              <div className={example.childClassName}>Any JSX</div>
            </ItemExpandContract>
          </figure>
        ))}
      </div>
    </div>
  )
}
