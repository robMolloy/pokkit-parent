import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { cn } from 'cn'
import './CircleUpDown.css'

type CircleUpDownProps = {
  className?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

type CircleLayout = {
  size: number
  travel: number
}

export function CircleUpDown({ className, duration }: CircleUpDownProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<CircleLayout>({ size: 0, travel: 0 })

  useLayoutEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      const width = node.clientWidth
      const height = node.clientHeight
      const tallEnough = height >= width
      const size = tallEnough ? width : height
      const travel = tallEnough ? height - width : 0
      setLayout({ size, travel })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const phase = duration
  const cycle = phase * 2
  const canMove = layout.travel > 0
  const motionTiming = {
    animationDuration: `${cycle}s`,
    width: layout.size,
    height: layout.size,
    ['--travel' as string]: `${layout.travel}px`,
    top: canMove ? undefined : 0,
  } satisfies CSSProperties

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full min-h-0', className)}
    >
      <p className="sr-only">
        A circle slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        className={cn(
          'circle-up-down-circle absolute left-1/2 -translate-x-1/2 rounded-full',
          'bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklch,var(--foreground)_76%,white),var(--foreground)_68%)]',
          canMove && 'circle-up-down-circle--animated',
        )}
        style={motionTiming}
      />
    </div>
  )
}
