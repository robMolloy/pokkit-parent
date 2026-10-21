import { useLayoutEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

type CircleUpDownMotionProps = {
  className?: string
  /** Seconds for the slow rise (inhale). */
  riseDuration?: number
  /** Seconds for the slow fall (exhale). */
  fallDuration?: number
}

const defaultRiseDuration = 4
const defaultFallDuration = 8

/** Matches CircleUpDown travel: min(28vh, 11rem). */
function measureBreathTravelPx() {
  if (typeof window === 'undefined') return 11 * 16
  const root =
    Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    ) || 16
  return Math.min(window.innerHeight * 0.28, 11 * root)
}

/**
 * A centered circle that rises and falls with a relaxed breathing rhythm—slight
 * expansion on the inhale, then a longer, softer exhale down. Driven by Motion.
 */
export function CircleUpDownMotion({
  className,
  riseDuration = defaultRiseDuration,
  fallDuration = defaultFallDuration,
}: CircleUpDownMotionProps) {
  const reduceMotion = useReducedMotion()
  const [travelPx, setTravelPx] = useState(measureBreathTravelPx)
  const cycle = riseDuration + fallDuration
  const riseEnd = cycle === 0 ? 0 : riseDuration / cycle

  useLayoutEffect(() => {
    const update = () => setTravelPx(measureBreathTravelPx())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const atRest = {
    y: 0,
    scale: 1,
  }

  const breathing = {
    y: [0, -travelPx, 0],
    scale: [1, 1.08, 1],
  }

  return (
    <div className={className}>
      <p className="sr-only">
        A circle slowly rises as you breathe in over {riseDuration}{' '}
        {riseDuration === 1 ? 'second' : 'seconds'}, then falls as you breathe
        out over {fallDuration}{' '}
        {fallDuration === 1 ? 'second' : 'seconds'}, and repeats.
      </p>
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={cn(
            'circle-up-down-motion-circle size-32 rounded-full',
            'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          )}
          initial={atRest}
          animate={reduceMotion ? atRest : breathing}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: cycle,
                  times: [0, riseEnd, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                }
          }
        />
      </div>
    </div>
  )
}
