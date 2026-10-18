import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { cn } from 'cn'
import './ItemUpDown.css'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function ItemUpDown({ children, className, duration }: ItemUpDownProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)
  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
  } satisfies CSSProperties

  useLayoutEffect(() => {
    const root = rootRef.current
    const motion = motionRef.current
    if (!root || !motion) {
      return
    }

    const syncTravel = () => {
      const rootHeight = root.getBoundingClientRect().height
      const motionHeight = motion.getBoundingClientRect().height
      const travel = rootHeight - motionHeight
      motion.style.setProperty(
        '--item-up-down-travel',
        `${Math.max(0, travel)}px`,
      )
    }

    syncTravel()
    const observer = new ResizeObserver(syncTravel)
    observer.observe(root)
    observer.observe(motion)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn('item-up-down-root absolute inset-0', className)}
    >
      <p className="sr-only">
        Content slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        ref={motionRef}
        className={cn('item-up-down-motion absolute top-0 left-1/2')}
        style={motionTiming}
      >
        {children}
      </div>
    </div>
  )
}
