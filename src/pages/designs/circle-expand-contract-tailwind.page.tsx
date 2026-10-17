import { useState } from 'react'
import { CircleExpandContractTailwind } from '@/designs/CircleExpandContractTailwind.tsx'

export default function CircleExpandContractTailwindPage() {
  const [expandDuration, setExpandDuration] = useState(3)
  const [contractDuration, setContractDuration] = useState(3)

  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col">
      <div className="relative z-[2] flex flex-wrap items-end justify-center gap-4 border-b border-border bg-background/90 px-5 py-4 backdrop-blur-sm">
        <label className="flex min-w-[10rem] flex-col gap-1 text-sm">
          Expand (s)
          <input
            type="range"
            min={1}
            max={8}
            step={0.5}
            value={expandDuration}
            onChange={(event) => setExpandDuration(Number(event.target.value))}
          />
          <span className="text-muted-foreground tabular-nums">{expandDuration}s</span>
        </label>
        <label className="flex min-w-[10rem] flex-col gap-1 text-sm">
          Contract (s)
          <input
            type="range"
            min={1}
            max={8}
            step={0.5}
            value={contractDuration}
            onChange={(event) => setContractDuration(Number(event.target.value))}
          />
          <span className="text-muted-foreground tabular-nums">{contractDuration}s</span>
        </label>
      </div>
      <CircleExpandContractTailwind
        expandDuration={expandDuration}
        contractDuration={contractDuration}
      />
    </div>
  )
}
