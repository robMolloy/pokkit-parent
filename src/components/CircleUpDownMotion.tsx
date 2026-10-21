import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

type CircleUpDownMotionProps = {
  className?: string
  /** Seconds for the slow rise (inhale). */
  riseDuration?: number
  /** Seconds for the slow fall (exhale). */
  fallDuration?: number
}

const travel = 'min(28vh, 11rem)'

const defaultRiseDuration = 4
const defaultFallDuration = 8

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
  const cycle = riseDuration + fallDuration
  const riseEnd = cycle === 0 ? 0 : riseDuration / cycle

  const atRest = {
    x: '-50%',
    y: '-50%',
    scale: 1,
  }

  const breathing = {
    x: '-50%',
    y: ['-50%', `calc(-50% - ${travel})`, '-50%'],
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
      <motion.div
        className={cn(
          'circle-up-down-motion-circle fixed top-1/2 left-1/2 size-32 rounded-full',
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
                ease: [0.45, 0.05, 0.55, 0.95],
                repeat: Infinity,
              }
        }
      />
    </div>
  )
}
