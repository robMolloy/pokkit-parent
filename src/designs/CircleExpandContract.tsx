import type { CSSProperties } from 'react'
import { cn } from 'cn'
import {
  circleExpandContractAnimations,
  circleExpandContractDurationSeconds,
  circleExpandContractFormatSeconds,
} from '@/designs/circleExpandContractAnimation.ts'
import './CircleExpandContract.css'

const dotSize = '8px'

type CircleExpandContractProps = {
  className?: string
  expandDuration?: number
  contractDuration?: number
}

export function CircleExpandContract({
  className,
  expandDuration,
  contractDuration,
}: CircleExpandContractProps) {
  const expand = circleExpandContractDurationSeconds(expandDuration)
  const contract = circleExpandContractDurationSeconds(contractDuration)
  const animations =
    expand === contract
      ? null
      : circleExpandContractAnimations(expand, contract, 'circle-expand-contract')
  const timing =
    expand === contract
      ? `Each movement takes ${circleExpandContractFormatSeconds(expand)} and repeats.`
      : `Expanding takes ${circleExpandContractFormatSeconds(expand)}, contracting takes ${circleExpandContractFormatSeconds(contract)}, and the cycle repeats.`

  const circleStyle = {
    '--circle-expand-contract-expand': `${expand}s`,
    '--circle-expand-contract-contract': `${contract}s`,
    '--circle-expand-contract-dot': dotSize,
    ...(animations
      ? {
          '--circle-expand-contract-circle': animations.circle,
          '--circle-expand-contract-cue-expand': animations.cueExpand,
          '--circle-expand-contract-cue-contract': animations.cueContract,
        }
      : null),
  } as CSSProperties

  return (
    <div className={cn('circle-expand-contract', className)} style={circleStyle}>
      {animations ? <style>{animations.css}</style> : null}
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a dot.{' '}
        {timing}
      </p>
      <div className="circle-expand-contract-circle" />
      <p className="circle-expand-contract-cue" aria-hidden="true">
        <span className="circle-expand-contract-cue-expand">Expand</span>
        <span className="circle-expand-contract-cue-contract">Contract</span>
      </p>
    </div>
  )
}
