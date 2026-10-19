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
          <figcaption className="text-sm">
            <span className="font-medium">Full width at rest</span>
            <span className="text-muted-foreground">
              {' '}
              — Child is 100% of container width and a fixed partial height
              (horizontal bar). Uniform scale collapses to a dot in X and Y,
              then returns to this shape.
            </span>
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
          <figcaption className="text-sm">
            <span className="font-medium">Full width at rest (centred)</span>
            <span className="text-muted-foreground">
              {' '}
              — Same horizontal bar as above, vertically centred in the container
              at rest. Scale still collapses to a dot at the centre of the clip
              region.
            </span>
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
          <figcaption className="text-sm">
            <span className="font-medium">Full height at rest</span>
            <span className="text-muted-foreground">
              {' '}
              — Child is 100% of container height and a fixed partial width
              (vertical strip). Same uniform scale: rest size → dot → rest.
            </span>
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
          <figcaption className="text-sm">
            <span className="font-medium">Full height at rest (centred)</span>
            <span className="text-muted-foreground">
              {' '}
              — Same vertical strip as above, horizontally centred in the
              container at rest. Scale still collapses to a dot at the centre of
              the clip region.
            </span>
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
          <figcaption className="text-sm">
            <span className="font-medium">Compact</span>
            <span className="text-muted-foreground"> — h-32 · max-w-xs</span>
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-xs"
            containerClassName={`h-32 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Medium</span>
            <span className="text-muted-foreground"> — h-48 · max-w-sm</span>
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-sm"
            containerClassName={`h-48 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-base`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Default</span>
            <span className="text-muted-foreground"> — h-72 · max-w-md</span>
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-72 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-lg`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Tall</span>
            <span className="text-muted-foreground"> — h-[28rem] · max-w-md</span>
          </figcaption>
          <ItemExpandContract
            className="w-full max-w-md"
            containerClassName={`h-[28rem] ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-lg`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Wide & short</span>
            <span className="text-muted-foreground"> — h-36 · full width</span>
          </figcaption>
          <ItemExpandContract
            className="w-full"
            containerClassName={`h-36 ${clipBorder}`}
            duration={duration}
          >
            <div className={`${childBase} size-full text-sm`}>Any JSX</div>
          </ItemExpandContract>
        </figure>

        <figure className="flex flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Narrow & tall</span>
            <span className="text-muted-foreground"> — h-96 · max-w-[10rem]</span>
          </figcaption>
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
