import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './CircleExpandContract.css'

const dotSize = '8px'
const cueVisiblePortion = 0.84

type CircleExpandContractProps = {
  className?: string
  expandDuration: number
  contractDuration: number
}

function formatSeconds(seconds: number) {
  return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
}

function percent(value: number) {
  return `${Number(value.toFixed(4))}%`
}

function expandContractAnimations(expandDuration: number, contractDuration: number) {
  const total = expandDuration + contractDuration
  const expandEnd = (expandDuration / total) * 100
  const expandFadeStart = expandEnd * cueVisiblePortion
  const contractFadeStart = expandEnd + (100 - expandEnd) * cueVisiblePortion
  const slug = `${expandDuration}-${contractDuration}`.replace(/[^a-zA-Z0-9_-]/g, '_')
  const circle = `circle-expand-contract-dilate-${slug}`
  const cueExpand = `circle-expand-contract-cue-expand-${slug}`
  const cueContract = `circle-expand-contract-cue-contract-${slug}`
  const held = percent(expandFadeStart)
  const peak = percent(expandEnd)
  const returning = percent(contractFadeStart)

  const css = `
@keyframes ${circle} {
  0%, 100% {
    width: var(--circle-expand-contract-dot);
    height: var(--circle-expand-contract-dot);
  }
  ${peak} {
    width: 100vw;
    height: 100vw;
  }
}
@keyframes ${cueExpand} {
  0%, ${held} { opacity: 1; }
  ${peak}, ${returning} { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes ${cueContract} {
  0%, ${held} { opacity: 0; }
  ${peak}, ${returning} { opacity: 1; }
  100% { opacity: 0; }
}
`

  return { circle, cueExpand, cueContract, css }
}

export function CircleExpandContract({
  className,
  expandDuration,
  contractDuration,
}: CircleExpandContractProps) {
  const expand = expandDuration
  const contract = contractDuration
  const animations =
    expand === contract ? null : expandContractAnimations(expand, contract)
  const timing =
    expand === contract
      ? `Each movement takes ${formatSeconds(expand)} and repeats.`
      : `Expanding takes ${formatSeconds(expand)}, contracting takes ${formatSeconds(contract)}, and the cycle repeats.`

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
