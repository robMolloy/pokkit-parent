import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

type CircleUpDownMotionProps = {
  className?: string
  /** Seconds for the inhale (rise) or exhale (fall) leg. One full breath is twice this. */
  duration: number
}

const travel = 'min(28vh, 11rem)'

/**
 * A centered circle that rises and falls with a relaxed breathing rhythm—slight
 * expansion on the inhale, a brief hold at the top, then a soft exhale down.
 * Same role as {@link CircleUpDown}, driven by Motion instead of CSS keyframes.
 */
export function CircleUpDownMotion({
  className,
  duration,
}: CircleUpDownMotionProps) {
  const reduceMotion = useReducedMotion()
  const phase = duration
  const cycle = phase * 2

  const atRest = {
    x: '-50%',
    y: '-50%',
    scale: 1,
  }

  const breathing = {
    x: '-50%',
    y: [
      '-50%',
      `calc(-50% - ${travel})`,
      `calc(-50% - ${travel})`,
      '-50%',
    ],
    scale: [1, 1.08, 1.08, 1],
  }

  return (
    <div className={className}>
      <p className="sr-only">
        A circle slowly rises as you breathe in, pauses briefly, then falls as
        you breathe out. Each inhale or exhale takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
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
                times: [0, 0.4, 0.6, 1],
                ease: [0.45, 0.05, 0.55, 0.95],
                repeat: Infinity,
              }
        }
      />
    </div>
  )
}
