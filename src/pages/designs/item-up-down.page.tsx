import { useState } from 'react'
import { ItemUpDown } from '@/components/ItemUpDown.tsx'

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
      <div className="flex flex-1 items-center justify-center px-5 py-8">
        <ItemUpDown className="w-full max-w-md" duration={duration}>
          <div className="flex size-32 items-center justify-center rounded-2xl border border-border bg-card text-lg font-medium shadow-sm">
            Any JSX
          </div>
        </ItemUpDown>
      </div>
    </div>
  )
}
