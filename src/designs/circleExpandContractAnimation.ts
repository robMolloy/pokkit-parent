export const circleExpandContractDefaultDuration = 3

export function circleExpandContractDurationSeconds(value: number | undefined) {
  if (value == null || !Number.isFinite(value) || value <= 0) {
    return circleExpandContractDefaultDuration
  }
  return value
}

export function circleExpandContractFormatSeconds(seconds: number) {
  return `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`
}

function percent(value: number) {
  return `${Number(value.toFixed(4))}%`
}

const cueVisiblePortion = 0.84

export type CircleExpandContractAnimationSet = {
  circle: string
  cueExpand: string
  cueContract: string
  css: string
}

export function circleExpandContractAnimations(
  expandDuration: number,
  contractDuration: number,
  keyframePrefix: 'circle-expand-contract' | 'circle-expand-contract-tw',
): CircleExpandContractAnimationSet {
  const total = expandDuration + contractDuration
  const expandEnd = (expandDuration / total) * 100
  const expandFadeStart = expandEnd * cueVisiblePortion
  const contractFadeStart = expandEnd + (100 - expandEnd) * cueVisiblePortion
  const slug = `${expandDuration}-${contractDuration}`.replace(/[^a-zA-Z0-9_-]/g, '_')
  const circle = `${keyframePrefix}-dilate-${slug}`
  const cueExpand = `${keyframePrefix}-cue-expand-${slug}`
  const cueContract = `${keyframePrefix}-cue-contract-${slug}`
  const held = percent(expandFadeStart)
  const peak = percent(expandEnd)
  const returning = percent(contractFadeStart)

  const css = `
@keyframes ${circle} {
  0%, 100% {
    width: var(--circle-expand-contract-dot, 8px);
    height: var(--circle-expand-contract-dot, 8px);
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

export const circleExpandContractTwDefaultKeyframes = {
  circle: 'circle-expand-contract-tw-dilate',
  cueExpand: 'circle-expand-contract-tw-cue-expand',
  cueContract: 'circle-expand-contract-tw-cue-contract',
} as const
