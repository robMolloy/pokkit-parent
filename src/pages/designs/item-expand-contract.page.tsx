import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const clipBorder =
  'rounded-xl border border-dashed border-border bg-muted/30'

const childBase =
  'flex items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

export default function ItemExpandContractPage() {
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
        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full width at rest
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} h-20 w-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full width at rest (centred)
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className={`${childBase} h-20 w-full text-sm`}>Any JSX</div>
            </div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full height at rest
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} h-full w-24 text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">
            Full height at rest (centred)
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className={`${childBase} h-full w-24 text-sm`}>Any JSX</div>
            </div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Compact</figcaption>
          <ItemExpandContract
            className="w-full max-w-xs"
            containerClassName={`h-32 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Medium</figcaption>
          <ItemExpandContract
            className="w-full max-w-sm"
            containerClassName={`h-48 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-base`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Default</figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-lg`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Tall</figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-[28rem] ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-lg`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Wide & short</figcaption>
          <ItemExpandContract
            className="w-full"
            containerClassName={`h-36 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm font-medium">Narrow & tall</figcaption>
          <ItemExpandContract
            className="w-full max-w-[10rem]"
            containerClassName={`h-96 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>
      </div>
    </div>
  )
}
