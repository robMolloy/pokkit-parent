import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { cn } from 'cn'
import './ItemExpandContract.css'

const DOT_PX = 8

type ItemExpandContractProps = {
  children: ReactNode
  className?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function ItemExpandContract({
  children,
  className,
  duration,
}: ItemExpandContractProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [scaleRange, setScaleRange] = useState({ min: DOT_PX / 128, peak: 8 })

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return

    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      const maxDim = Math.max(width, height, 1)
      setScaleRange({
        min: DOT_PX / maxDim,
        peak: window.innerWidth / maxDim,
      })
    }

    update()
    const Observer = globalThis.ResizeObserver
    const observer = Observer ? new Observer(update) : null
    observer?.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [children])

  const phase = duration
  const cycle = phase * 2
  const motionTiming = {
    animationDuration: `${cycle}s`,
    '--item-expand-contract-min': scaleRange.min,
    '--item-expand-contract-peak': scaleRange.peak,
  } as CSSProperties

  return (
    <div className={className}>
      <p className="sr-only">
        Content expands to the width of the screen, then contracts to a dot.
        Each movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and
        repeats.
      </p>
      <div
        className={cn(
          'item-expand-contract-motion fixed top-1/2 left-1/2',
          'motion-reduce:scale-100 motion-reduce:[animation:none]',
        )}
        style={motionTiming}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  )
}
