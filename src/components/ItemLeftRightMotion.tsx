import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from 'cn'
import {
  afterItemLeftRightSweep,
  type ItemLeftRightMotionCallbacks,
} from './itemLeftRightMotion'

/**
 * Same horizontal travel as {@link ItemLeftRight}, driven by Motion instead of CSS
 * keyframes. Sweep/cycle timing matches the CSS version (`duration` per leg).
 */
export function ItemLeftRightMotion(p: {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip (travel height is set on the root via `className`, default `h-72`). */
  containerClassName?: string
  /** Classes on the slot around children (default shrink-wraps with `w-fit max-w-full shrink-0`). */
  contentClassName?: string
  /** Seconds for a single sweep (one horizontal leg). A full out-and-back cycle is `2 × duration`. */
  duration: number
  onSweepComplete?: ItemLeftRightMotionCallbacks['onSweepComplete']
  onCycleComplete?: ItemLeftRightMotionCallbacks['onCycleComplete']
}) {
  const reduceMotion = useReducedMotion()
  const sweepCount = useRef(0)

  const sweepKeyframes = {
    left: ['0%', '100%'],
    x: ['0%', '-100%'],
  }

  const atRest = {
    left: '0%',
    x: '0%',
  }

  const callbacks: ItemLeftRightMotionCallbacks = {}
  if (p.onSweepComplete !== undefined) {
    callbacks.onSweepComplete = p.onSweepComplete
  }
  if (p.onCycleComplete !== undefined) {
    callbacks.onCycleComplete = p.onCycleComplete
  }

  const onAnimationComplete = () => {
    if (reduceMotion) return
    sweepCount.current = afterItemLeftRightSweep(
      sweepCount.current,
      callbacks,
    )
  }

  return (
    <div className={cn('relative h-72 w-full', p.className)}>
      <p className="sr-only">
        Content slowly moves right, then left. Each movement takes {p.duration}{' '}
        {p.duration === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          p.containerClassName,
        )}
      >
        <motion.div
          className="item-left-right-lib-motion absolute inset-y-0 flex items-center"
          initial={atRest}
          animate={reduceMotion ? atRest : sweepKeyframes}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: p.duration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse',
                }
          }
          onAnimationComplete={onAnimationComplete}
        >
          <div
            className={cn(
              'w-fit max-w-full shrink-0',
              p.contentClassName,
            )}
          >
            {p.children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
