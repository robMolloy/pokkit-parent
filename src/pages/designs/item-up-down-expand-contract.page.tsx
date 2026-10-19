import { useState, type ReactNode } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

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
      <div className="flex flex-1 flex-col gap-8 px-5 py-8">
        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full width at rest
          </figcaption>
          <ItemUpDownExpandContractDemo
            duration={duration}
            wrapperClassName="w-full max-w-md"
            containerClassName={`h-[28rem] ${clipBorder}`}
            expandContainerClassName={`h-72 ${clipBorder}`}
          >
            <div className={`${childBase} h-20 w-full text-sm`}>Any JSX</div>
          </ItemUpDownExpandContractDemo>
        </figure>
      </div>
    </div>
  )
}
