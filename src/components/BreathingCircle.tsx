import { useEffect } from 'react'
import { motion, useAnimate, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

/** Vertical travel in pixels (matches circle-up-down CSS travel: min(28vh, 11rem) cap at 11rem). */
const TRAVEL_PX = 176

/** Scale at the bottom resting position (exhale). */
const REST_SCALE = 0.5

/** Peak scale at the top of the rise (inhale), slightly above full size. */
const RISE_SCALE = 1.06

/** Brief scale bump when the circle reaches the top (seconds). */
const PULSE_DURATION = 0.2

/** Scale at the quick pulse peak. */
const PULSE_SCALE = 1.14

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
  const [scope, runAnimation] = useAnimate<HTMLDivElement>()
  const totalDuration = riseDuration + fallDuration
  const phaseBoundary = riseDuration / totalDuration

  const atRest = {
    y: 0,
    scale: REST_SCALE,
  }

  useEffect(() => {
    const element = scope.current
    if (!element) return

    if (reduceMotion) {
      void runAnimation(element, atRest, { duration: 0 })
      return
    }

    const pulseFraction = PULSE_DURATION / totalDuration
    const pulsePeakTime = phaseBoundary + pulseFraction / 2
    const pulseEndTime = phaseBoundary + pulseFraction

    const controls = runAnimation(
      element,
      {
        y: [0, -TRAVEL_PX, -TRAVEL_PX, -TRAVEL_PX, 0],
        scale: [REST_SCALE, RISE_SCALE, PULSE_SCALE, RISE_SCALE, REST_SCALE],
      },
      {
        duration: totalDuration,
        times: [0, phaseBoundary, pulsePeakTime, pulseEndTime, 1],
        ease: ['easeInOut', 'easeOut', 'easeIn', 'easeInOut'],
        repeat: Infinity,
      },
    )

    return () => controls.stop()
  }, [
    runAnimation,
    reduceMotion,
    riseDuration,
    fallDuration,
    totalDuration,
    phaseBoundary,
    scope,
  ])

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
          ref={scope}
          className={cn(
            'size-32 shrink-0 rounded-full',
            'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          )}
          initial={atRest}
        />
      </div>
    </div>
  )
}
