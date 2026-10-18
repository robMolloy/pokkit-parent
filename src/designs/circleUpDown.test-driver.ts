/** Drives CircleUpDown keyframes in jsdom, which does not run CSS animations. */

const mountTimes = new WeakMap<Element, number>()

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
}

function risePx(viewHeight: number): number {
  return Math.min(viewHeight * 0.28, 11 * 16)
}

function verticalOffsetAtProgress(progress: number, maxRise: number): number {
  const phase = progress % 1
  if (phase <= 0.5) {
    return easeInOut(phase / 0.5) * maxRise
  }
  return easeInOut(1 - (phase - 0.5) / 0.5) * maxRise
}

function tickCircleUpDownAnimations(): void {
  const now = performance.now()
  const maxRise = risePx(window.innerHeight || 800)

  for (const el of document.querySelectorAll('.circle-up-down-circle')) {
    if (!mountTimes.has(el)) {
      mountTimes.set(el, now)
    }

    const durationSec = Number.parseFloat(getComputedStyle(el).animationDuration)
    if (!Number.isFinite(durationSec) || durationSec <= 0) {
      continue
    }

    const elapsedSec = (now - mountTimes.get(el)!) / 1000
    const progress = (elapsedSec / durationSec) % 1
    const offset = verticalOffsetAtProgress(progress, maxRise)
    el.style.transform = `translate(-50%, calc(-50% - ${offset}px))`
  }
}

export function startCircleUpDownAnimationDriver(): () => void {
  tickCircleUpDownAnimations()
  const id = setInterval(tickCircleUpDownAnimations, 16)
  return () => clearInterval(id)
}
