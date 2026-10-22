import { useState } from 'react'
import { CircleExpandContract } from '@/components/CircleExpandContract.tsx'

export default function CircleExpandContractPage() {
  const [duration, setDuration] = useState(3)

  return (
    <div className="flex h-[calc(100svh-4.5rem)] flex-col">
      <label className="relative z-10 flex shrink-0 flex-col gap-1 border-b border-border bg-background px-5 py-4 text-sm">
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
      <CircleExpandContract duration={duration} />
    </div>
  )
}
