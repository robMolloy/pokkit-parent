import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './CircleExpandAndContract.css'

const dotSize = '8px'
const defaultDuration = 3
const cueVisiblePortion = 0.84

type CircleExpandAndContractProps = {
  className?: string
  expandDuration?: number
  contractDuration?: number
}

function durationSeconds(value: number | undefined) {
  if (value == null || !Number.isFinite(value) || value <= 0) {
    return defaultDuration
  }
  return value
}

function formatSeconds(seconds: number) {
  return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
}

function percent(value: number) {
  return `${Number(value.toFixed(4))}%`
}

function circleAnimations(expandDuration: number, contractDuration: number) {
  const total = expandDuration + contractDuration
  const expandEnd = (expandDuration / total) * 100
  const expandFadeStart = expandEnd * cueVisiblePortion
  const contractFadeStart = expandEnd + (100 - expandEnd) * cueVisiblePortion
  const slug = `${expandDuration}-${contractDuration}`.replace(
    /[^a-zA-Z0-9_-]/g,
    '_',
  )
  const circle = `circle-expand-contract-${slug}`
  const cueExpand = `circle-expand-cue-${slug}`
  const cueContract = `circle-contract-cue-${slug}`
  const held = percent(expandFadeStart)
  const peak = percent(expandEnd)
  const returning = percent(contractFadeStart)

  const css = `
@keyframes ${circle} {
  0%, 100% {
    width: var(--circle-dot);
    height: var(--circle-dot);
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

export function CircleExpandAndContract({
  className,
  expandDuration,
  contractDuration,
}: CircleExpandAndContractProps) {
  const expand = durationSeconds(expandDuration)
  const contract = durationSeconds(contractDuration)
  const animations =
    expand === contract ? null : circleAnimations(expand, contract)
  const timing =
    expand === contract
      ? `Each movement takes ${formatSeconds(expand)} and repeats.`
      : `Expanding takes ${formatSeconds(expand)}, contracting takes ${formatSeconds(contract)}, and the cycle repeats.`

  const circleStyle = {
    '--circle-expand': `${expand}s`,
    '--circle-contract': `${contract}s`,
    '--circle-dot': dotSize,
    ...(animations
      ? {
          '--circle-motion': animations.circle,
          '--circle-cue-expand': animations.cueExpand,
          '--circle-cue-contract': animations.cueContract,
        }
      : null),
  } as CSSProperties

  return (
    <div className={cn('circle-expand', className)} style={circleStyle}>
      {animations ? <style>{animations.css}</style> : null}
      <p className="sr-only">
        The circle expands to the width of the screen, then contracts to a
        dot. {timing}
      </p>
      <div className="circle-expand-shape" />
      <p className="circle-expand-cue" aria-hidden="true">
        <span className="circle-expand-cue-expand">Expand</span>
        <span className="circle-expand-cue-contract">Contract</span>
      </p>
    </div>
  )
}
