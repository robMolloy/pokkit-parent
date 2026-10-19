import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

const examples = [
  {
    label: 'Full width at rest',
    description:
      'Child is 100% of container width and a fixed partial height (horizontal bar). Uniform scale collapses to a dot in X and Y, then returns to this shape.',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-20 w-full text-sm`,
  },
  {
    label: 'Full width at rest (centred)',
    description:
      'Same horizontal bar as above, vertically centred in the container at rest. Scale still collapses to a dot at the centre of the clip region.',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-20 w-full text-sm`,
    childLayout: 'centre-vertical',
  },
  {
    label: 'Full height at rest',
    description:
      'Child is 100% of container height and a fixed partial width (vertical strip). Same uniform scale: rest size → dot → rest.',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-full w-24 text-sm`,
  },
  {
    label: 'Compact',
    description: 'h-32 · max-w-xs',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: `h-32 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
  },
  {
    label: 'Medium',
    description: 'h-48 · max-w-sm',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: `h-48 ${clipBorder}`,
    childClassName: `${childBase} size-full text-base`,
  },
  {
    label: 'Default',
    description: 'h-72 · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} size-full text-lg`,
  },
  {
    label: 'Tall',
    description: 'h-[28rem] · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-[28rem] ${clipBorder}`,
    childClassName: `${childBase} size-full text-lg`,
  },
  {
    label: 'Wide & short',
    description: 'h-36 · full width',
    wrapperClassName: 'w-full',
    containerClassName: `h-36 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
  },
  {
    label: 'Narrow & tall',
    description: 'h-96 · max-w-[10rem]',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName: `h-96 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
  },
] as const satisfies ReadonlyArray<{
  label: string
  description: string
  wrapperClassName: string
  containerClassName: string
  childClassName: string
  childLayout?: 'centre-vertical'
}>

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
              {example.childLayout === 'centre-vertical' ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className={example.childClassName}>Any JSX</div>
                </div>
              ) : (
                <div className={example.childClassName}>Any JSX</div>
              )}
            </ItemExpandContract>
          </figure>
        ))}
      </div>
    </div>
  )
}
