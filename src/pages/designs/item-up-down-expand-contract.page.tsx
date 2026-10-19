import { useState, type ReactNode } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

const examples = [
  {
    label: 'Compact',
    description: 'h-32 · max-w-xs',
    wrapperClassName: 'w-full max-w-xs',
    containerClassName: `h-32 ${clipBorder}`,
    expandContainerClassName: `h-32 ${clipBorder}`,
    childClassName: 'size-full text-sm',
  },
  {
    label: 'Medium',
    description: 'h-48 · max-w-sm',
    wrapperClassName: 'w-full max-w-sm',
    containerClassName: `h-48 ${clipBorder}`,
    expandContainerClassName: `h-48 ${clipBorder}`,
    childClassName: 'size-full text-base',
  },
  {
    label: 'Default',
    description: 'h-72 · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-72 ${clipBorder}`,
    expandContainerClassName: `h-72 ${clipBorder}`,
    childClassName: 'size-full text-lg',
  },
  {
    label: 'Tall',
    description: 'h-[28rem] · max-w-md',
    wrapperClassName: 'w-full max-w-md',
    containerClassName: `h-[28rem] ${clipBorder}`,
    expandContainerClassName: `h-[28rem] ${clipBorder}`,
    childClassName: 'size-full text-lg',
  },
  {
    label: 'Wide & short',
    description: 'h-36 · full width',
    wrapperClassName: 'w-full',
    containerClassName: `h-36 ${clipBorder}`,
    expandContainerClassName: `h-36 ${clipBorder}`,
    childClassName: 'size-full text-sm',
  },
  {
    label: 'Narrow & tall',
    description: 'h-96 · max-w-[10rem]',
    wrapperClassName: 'w-full max-w-[10rem]',
    containerClassName: `h-96 ${clipBorder}`,
    expandContainerClassName: `h-96 ${clipBorder}`,
    childClassName: 'size-full text-sm',
  },
] as const

function ItemUpDownExpandContractDemo({
  duration,
  wrapperClassName,
  containerClassName,
  expandContainerClassName,
  children,
}: {
  duration: number
  wrapperClassName: string
  containerClassName: string
  expandContainerClassName: string
  children: ReactNode
}) {
  return (
    <ItemUpDown
      className={wrapperClassName}
      containerClassName={containerClassName}
      duration={duration}
    >
      <ItemExpandContract
        className={wrapperClassName}
        containerClassName={expandContainerClassName}
        duration={duration}
      >
        {children}
      </ItemExpandContract>
    </ItemUpDown>
  )
}

export default function ItemUpDownExpandContractPage() {
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
        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full width at rest
          </figcaption>
          <ItemUpDownExpandContractDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            expandContainerClassName={`h-72 ${clipBorder}`}
          >
            <div className={`${childBase} h-20 w-full text-sm`}>Any JSX</div>
          </ItemUpDownExpandContractDemo>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full width at rest (centred)
          </figcaption>
          <ItemUpDownExpandContractDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            expandContainerClassName={`h-72 ${clipBorder}`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className={`${childBase} h-20 w-full text-sm`}>Any JSX</div>
            </div>
          </ItemUpDownExpandContractDemo>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full height at rest
          </figcaption>
          <ItemUpDownExpandContractDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            expandContainerClassName={`h-72 ${clipBorder}`}
          >
            <div className={`${childBase} h-full w-24 text-sm`}>Any JSX</div>
          </ItemUpDownExpandContractDemo>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full height at rest (centred)
          </figcaption>
          <ItemUpDownExpandContractDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            expandContainerClassName={`h-72 ${clipBorder}`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className={`${childBase} h-full w-24 text-sm`}>Any JSX</div>
            </div>
          </ItemUpDownExpandContractDemo>
        </figure>

        {examples.map((example) => (
          <figure key={example.label} className="flex flex-col gap-3">
            <figcaption className="text-sm">
              <span className="font-medium">{example.label}</span>
              <span className="text-muted-foreground">
                {' '}
                — {example.description}
              </span>
            </figcaption>
            <ItemUpDownExpandContractDemo
              duration={duration}
              wrapperClassName={example.wrapperClassName}
              containerClassName={example.containerClassName}
              expandContainerClassName={example.expandContainerClassName}
            >
              <div className={`${childBase} ${example.childClassName}`}>
                Any JSX
              </div>
            </ItemUpDownExpandContractDemo>
          </figure>
        ))}
      </div>
    </div>
  )
}
