import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'

const MIN_EXPAND_PX = 8

type ItemExpandContractProps = {
  children: ReactNode
  className?: string
  /** Classes on the clip region that defines max size (default height `h-72`). */
  containerClassName?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
}

export function ItemExpandContract({
  children,
  className,
  containerClassName,
  duration,
}: ItemExpandContractProps) {
  const phase = duration
  const durationMs = phase * 1000
  const containerRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const element = elementRef.current

    if (!container || !element) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animation: Animation | undefined

    function updateAnimation() {
      animation?.cancel()

      const containerWidth = container!.clientWidth
      const minScaleX = Math.min(MIN_EXPAND_PX / containerWidth, 1)

      if (prefersReducedMotion) {
        element!.style.transform = 'scale(1, 1)'
        return
      }

      animation = element!.animate(
        [
          { transform: 'scale(1, 1)' },
          { transform: `scale(${minScaleX}, 1)` },
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

    updateAnimation()

    return () => {
      observer.disconnect()
      animation?.cancel()
    }
  }, [durationMs])

  return (
    <div className={className}>
      <p className="sr-only">
        A full-width bar rests at the width of the container, then contracts
        horizontally and expands back without changing height. Each movement
        takes {phase} {phase === 1 ? 'second' : 'seconds'} and repeats.
      </p>
      <div
        ref={containerRef}
        className={cn(
          'flex h-72 w-full items-center justify-center overflow-hidden',
          containerClassName,
        )}
      >
        <div
          ref={elementRef}
          className="w-full origin-center will-change-transform motion-reduce:scale-100"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
