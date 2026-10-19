import { useState } from 'react'
import { ItemExpandContract } from '@/components/ItemExpandContract.tsx'

const barClassName =
  'flex w-full shrink-0 items-center justify-center rounded-2xl border border-border bg-card font-medium shadow-sm'

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
      <div className="flex flex-1 flex-col gap-10 px-5 py-8">
        <figure className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          <figcaption className="text-sm">
            <span className="font-medium">Full-width bar</span>
            <span className="text-muted-foreground">
              {' '}
              — spans the container width at full expansion; height stays fixed
              while width pulses in and out
            </span>
          </figcaption>
          <ItemExpandContract
            className="w-full"
            containerClassName="h-72 rounded-xl border border-dashed border-border bg-muted/30"
            duration={duration}
          >
            <div className={`${barClassName} h-14 text-lg`}>Any JSX</div>
          </ItemExpandContract>
        </figure>
      </div>
    </div>
  )
}
