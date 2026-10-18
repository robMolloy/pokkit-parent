import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'

type ItemUpDownProps = {
  children: ReactNode
  className?: string
  /** Classes on the overflow clip that defines travel distance (default height `h-72`). */
  containerClassName?: string
  /** Seconds for one rise or one fall (full cycle is twice this). */
  duration: number
}

export function ItemUpDown({
  children,
  className,
  containerClassName,
  duration,
}: ItemUpDownProps) {
  const phase = duration
  const durationMs = phase * 1000
  const containerRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const element = elementRef.current

    if (!container || !element) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let animation: Animation | undefined

    function updateAnimation() {
      animation?.cancel()

      const distance = container!.clientHeight - element!.offsetHeight

      animation = element!.animate(
        [
          { transform: 'translateY(0)' },
          { transform: `translateY(${Math.max(0, distance)}px)` },
        ],
        {
          duration: durationMs,
          iterations: Infinity,
          direction: 'alternate',
          easing: 'ease-in-out',
        },
      )
    }

    const observer = new ResizeObserver(updateAnimation)
    observer.observe(container)
    observer.observe(element)

    updateAnimation()

    return () => {
      observer.disconnect()
      animation?.cancel()
    }
  }, [durationMs])

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly rises, then falls. Each movement takes {phase}{' '}
        {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        ref={containerRef}
        className={cn(
          'flex h-72 w-full flex-col items-center justify-start overflow-hidden',
          containerClassName,
        )}
      >
        <div ref={elementRef} className="shrink-0">
          {children}
        </div>
      </div>
    </div>
  )
}
