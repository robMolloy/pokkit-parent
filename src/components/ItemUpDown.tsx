import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from 'cn'
import './ItemUpDown.css'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip that defines travel distance (default height `h-72`). */
  containerClassName?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

function travelUnitElement(payload: HTMLElement): HTMLElement {
  return (
    payload.querySelector<HTMLElement>('.item-expand-contract-clip') ?? payload
  )
}

function syncTravelDistance(clip: HTMLElement, payload: HTMLElement) {
  const unit = travelUnitElement(payload)
  const travel = Math.max(0, clip.clientHeight - unit.offsetHeight)
  clip.style.setProperty('--item-up-down-travel', `${travel}px`)
}

export function ItemUpDown({
  children,
  className,
  containerClassName,
  duration,
}: ItemUpDownProps) {
  const phase = duration
  const clipRef = useRef<HTMLDivElement>(null)
  const payloadRef = useRef<HTMLDivElement>(null)
  const motionTiming = {
    animationDuration: `${phase}s`,
  } satisfies CSSProperties

  useEffect(() => {
    const clip = clipRef.current
    const payload = payloadRef.current

    if (!clip || !payload) return

    const update = () => {
      syncTravelDistance(clip, payload)
    }

    const observer = new ResizeObserver(update)
    observer.observe(clip)
    observer.observe(payload)
    update()

    return () => {
      observer.disconnect()
    }
  }, [children])

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        ref={clipRef}
        className={cn(
          'item-up-down-clip relative h-72 w-full overflow-hidden',
          containerClassName,
        )}
      >
        <div
          className="item-up-down-motion absolute inset-x-0 top-0 flex justify-center items-start"
          style={motionTiming}
        >
          <div ref={payloadRef} className="shrink-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
