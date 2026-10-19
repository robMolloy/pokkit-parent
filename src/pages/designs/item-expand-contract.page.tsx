import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

type ItemExpandContractExample = {
  label: string
  wrapperClassName: string
  containerClassName: string
  childClassName: string
  /** Flex-centre the child within the animated wrapper at rest (bar or strip). */
  childLayout?: 'centred'
}

const examples: readonly ItemExpandContractExample[] = [
  {
    label: 'Full width at rest',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-20 w-full text-sm`,
  },
  {
    label: 'Full width at rest (centred)',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-20 w-full text-sm`,
    childLayout: 'centred',
  },
  {
    label: 'Full height at rest',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-full w-24 text-sm`,
  },
  {
    label: 'Full height at rest (centred)',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} h-full w-24 text-sm`,
    childLayout: 'centred',
  },
  {
    label: 'Compact',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: `h-32 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
  },
  {
    label: 'Medium',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: `h-48 ${clipBorder}`,
    childClassName: `${childBase} size-full text-base`,
  },
  {
    label: 'Default',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    childClassName: `${childBase} size-full text-lg`,
  },
  {
    label: 'Tall',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-[28rem] ${clipBorder}`,
    childClassName: `${childBase} size-full text-lg`,
  },
  {
    label: 'Wide & short',
    wrapperClassName: 'w-full',
    containerClassName: `h-36 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
  },
  {
    label: 'Narrow & tall',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName: `h-96 ${clipBorder}`,
    childClassName: `${childBase} size-full text-sm`,
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
            <figcaption className="text-sm font-medium">{example.label}</figcaption>
            <ItemExpandContract
              className={example.wrapperClassName}
              containerClassName={example.containerClassName}
              duration={duration}
            >
              {example.childLayout === 'centred' ? (
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
