import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

/** Vertical travel in pixels (matches circle-up-down CSS travel: min(28vh, 11rem) cap at 11rem). */
const TRAVEL_PX = 176

const RISE_SCALE = 1.06

export type BreathingCircleProps = {
  className?: string
  /** Seconds to rise from rest to the top of travel. Default 8. */
  riseDuration?: number
  /** Seconds to fall from the top back to rest. Default 4. */
  fallDuration?: number
}

export function BreathingCircle({
  className,
  riseDuration = 8,
  fallDuration = 4,
}: BreathingCircleProps) {
  const reduceMotion = useReducedMotion()
  const totalDuration = riseDuration + fallDuration
  const phaseBoundary = riseDuration / totalDuration

  const atRest = {
    y: 0,
    scale: 1,
  }

  const breathingKeyframes = {
    y: [0, -TRAVEL_PX, 0],
    scale: [1, RISE_SCALE, 1],
  }

  return (
    <div className={className}>
      <p className="sr-only">
        A circle slowly rises over {riseDuration}{' '}
        {riseDuration === 1 ? 'second' : 'seconds'}, then falls over {fallDuration}{' '}
        {fallDuration === 1 ? 'second' : 'seconds'}, and repeats.
      </p>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center"
      >
        <motion.div
          className={cn(
            'size-32 shrink-0 rounded-full',
            'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          )}
          initial={atRest}
          animate={reduceMotion ? atRest : breathingKeyframes}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: totalDuration,
                  times: [0, phaseBoundary, 1],
                  ease: 'easeInOut',
                  repeat: Infinity,
                }
          }
        />
      </div>
    </div>
  )
}
