import { useState } from 'react'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

const demoContainers = [
  { id: 'sm', label: 'Small', className: 'h-40 w-52' },
  { id: 'md', label: 'Medium', className: 'h-64 w-72' },
  { id: 'lg', label: 'Large', className: 'h-96 w-full max-w-md' },
] as const

function DemoItem() {
  return (
    <div className="flex size-24 items-center justify-center rounded-2xl border-2 border-primary/40 bg-card text-sm font-medium shadow-sm">
      Any JSX
    </div>
  )
}

export default function ItemUpDownPage() {
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
      <div className="flex flex-1 flex-wrap content-center justify-center gap-8 p-6">
        {demoContainers.map(({ id, label, className }) => (
          <figure key={id} className="flex flex-col gap-2">
            <figcaption className="text-center text-xs text-muted-foreground">
              {label}
            </figcaption>
            <div
              className={`relative overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 ${className}`}
            >
              <ItemUpDown duration={duration}>
                <DemoItem />
              </ItemUpDown>
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}
