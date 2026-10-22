import { useState } from 'react'
import { BreathingCircle } from '@/components/BreathingCircle.tsx'

export default function BreathingCirclePage() {
  const [riseDuration, setRiseDuration] = useState(8)
  const [fallDuration, setFallDuration] = useState(4)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <div className="flex shrink-0 flex-wrap items-end gap-x-8 gap-y-3 border-b border-border bg-background px-5 py-4 text-sm">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1">
          Rise duration (s)
          <input
            type="range"
            min={1}
            max={16}
            step={0.5}
            value={riseDuration}
            onChange={(event) => setRiseDuration(Number(event.target.value))}
          />
          <span className="text-muted-foreground tabular-nums">{riseDuration}s</span>
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1">
          Fall duration (s)
          <input
            type="range"
            min={1}
            max={16}
            step={0.5}
            value={fallDuration}
            onChange={(event) => setFallDuration(Number(event.target.value))}
          />
          <span className="text-muted-foreground tabular-nums">{fallDuration}s</span>
        </label>
      </div>
      <BreathingCircle riseDuration={riseDuration} fallDuration={fallDuration} />
    </div>
  )
}
