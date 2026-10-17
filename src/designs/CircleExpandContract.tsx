import type { CSSProperties } from 'react'
import { cn } from 'cn'
import './CircleExpandContract.css'

const dotSize = '8px'
const defaultDuration = 3
const cueVisiblePortion = 0.84

type CircleExpandContractProps = {
  className?: string
  inDuration?: number
  outDuration?: number
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

function breatheAnimations(inDuration: number, outDuration: number) {
  const total = inDuration + outDuration
  const inEnd = (inDuration / total) * 100
  const inFadeStart = inEnd * cueVisiblePortion
  const outFadeStart = inEnd + (100 - inEnd) * cueVisiblePortion
  const slug = `${inDuration}-${outDuration}`.replace(/[^a-zA-Z0-9_-]/g, '_')
  const circle = `breathe-dilate-${slug}`
  const cueIn = `breathe-cue-in-${slug}`
  const cueOut = `breathe-cue-out-${slug}`
  const held = percent(inFadeStart)
  const peak = percent(inEnd)
  const returning = percent(outFadeStart)

  const css = `
@keyframes ${circle} {
  0%, 100% {
    width: var(--breathe-dot);
    height: var(--breathe-dot);
  }
  ${peak} {
    width: 100vw;
    height: 100vw;
  }
}
@keyframes ${cueIn} {
  0%, ${held} { opacity: 1; }
  ${peak}, ${returning} { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes ${cueOut} {
  0%, ${held} { opacity: 0; }
  ${peak}, ${returning} { opacity: 1; }
  100% { opacity: 0; }
}
`

  return { circle, cueIn, cueOut, css }
}

export function CircleExpandContract({
  className,
  inDuration,
  outDuration,
}: CircleExpandContractProps) {
  const inhale = durationSeconds(inDuration)
  const exhale = durationSeconds(outDuration)
  const animations =
    inhale === exhale ? null : breatheAnimations(inhale, exhale)
  const timing =
    inhale === exhale
      ? `Each movement takes ${formatSeconds(inhale)} and repeats.`
      : `Breathing in takes ${formatSeconds(inhale)}, breathing out takes ${formatSeconds(exhale)}, and the cycle repeats.`

  const breatheStyle = {
    '--breathe-in': `${inhale}s`,
    '--breathe-out': `${exhale}s`,
    '--breathe-dot': dotSize,
    ...(animations
      ? {
          '--breathe-circle': animations.circle,
          '--breathe-cue-in': animations.cueIn,
          '--breathe-cue-out': animations.cueOut,
        }
      : null),
  } as CSSProperties

  return (
    <div className={cn('breathe', className)} style={breatheStyle}>
      {animations ? <style>{animations.css}</style> : null}
      <p className="sr-only">
        Breathe in as the circle expands to the width of the screen, then
        breathe out as it shrinks to a dot. {timing}
      </p>
      <div className="breathe-circle" />
      <p className="breathe-cue" aria-hidden="true">
        <span className="breathe-cue-in">Breathe in</span>
        <span className="breathe-cue-out">Breathe out</span>
      </p>
    </div>
  )
}
