import { useState, type ReactNode } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const cardChildClass =
  'flex shrink-0 items-center justify-center border border-border bg-card font-medium shadow-sm'

const examples: {
  label: string
  description: string
  wrapperClassName: string
  containerClassName: string
  child: ReactNode
}[] = [
  {
    label: 'Compact',
    description: 'h-32 · max-w-xs · child fills box',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: 'h-32 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-full rounded-2xl text-sm`}>Any JSX</div>
    ),
  },
  {
    label: 'Medium square',
    description: 'h-48 · max-w-sm · square child',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: 'h-48 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-24 rounded-2xl text-base`}>Any JSX</div>
    ),
  },
  {
    label: 'Default',
    description: 'h-72 · max-w-md · square child',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: 'h-72 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-32 rounded-2xl text-lg`}>Any JSX</div>
    ),
  },
  {
    label: 'Tall box, small child',
    description: 'h-[28rem] · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName:
      'h-[28rem] rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-32 rounded-2xl text-lg`}>Any JSX</div>
    ),
  },
  {
    label: 'Wide & short',
    description: 'h-36 · full width · wide child',
    wrapperClassName: 'w-full',
    containerClassName: 'h-36 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} h-20 w-40 rounded-2xl text-sm`}>Any JSX</div>
    ),
  },
  {
    label: 'Narrow & tall',
    description: 'h-96 · max-w-[10rem] · small child',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName: 'h-96 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-20 rounded-2xl text-sm`}>Any JSX</div>
    ),
  },
  {
    label: 'Circle in rectangle',
    description: 'h-48 · max-w-lg · round child',
    wrapperClassName: 'w-full max-w-lg',
    containerClassName: 'h-48 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} size-28 rounded-full text-base`}>Any JSX</div>
    ),
  },
  {
    label: 'Pill in tall slot',
    description: 'h-80 · max-w-xs · wide pill',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: 'h-80 rounded-xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} h-14 w-44 rounded-full text-sm`}>Any JSX</div>
    ),
  },
  {
    label: 'Sharp card',
    description: 'h-56 · max-w-sm · square corners',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: 'h-56 rounded-2xl border border-dashed border-border bg-muted/30',
    child: (
      <div className={`${cardChildClass} h-24 w-56 rounded-none text-sm`}>Any JSX</div>
    ),
  },
]

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
          <figure key={example.label} className="flex flex-col gap-3">
            <figcaption className="text-sm">
              <span className="font-medium">{example.label}</span>
              <span className="text-muted-foreground"> — {example.description}</span>
            </figcaption>
            <ItemExpandContract
              className={example.wrapperClassName}
              containerClassName={example.containerClassName}
              duration={duration}
            >
              {example.child}
            </ItemExpandContract>
          </figure>
        ))}
      </div>
    </div>
  )
}
