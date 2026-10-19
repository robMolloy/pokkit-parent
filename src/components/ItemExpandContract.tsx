import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'

const MIN_EXPAND_PX = 8

type ItemExpandContractProps = {
  children: ReactNode
  className?: string
  /** Classes on the clip region (default shrink-wraps content). */
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

      if (prefersReducedMotion) {
        element!.style.transform = 'scale(1)'
        return
      }

      const measureWidth = element!.offsetWidth
      const measureHeight = element!.offsetHeight

      const minScale = Math.min(
        MIN_EXPAND_PX / Math.max(measureWidth, 1),
        MIN_EXPAND_PX / Math.max(measureHeight, 1),
        1,
      )

      animation = element!.animate(
        [
          { transform: `scale(${minScale})` },
          { transform: 'scale(1)' },
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
        Content slowly expands to its natural size, then contracts. Each
        movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and
        repeats.
      </p>
      <div
        ref={containerRef}
        className={cn(
          'mx-auto flex h-auto w-fit max-w-full items-center justify-center overflow-hidden',
          containerClassName,
        )}
      >
        <div
          ref={elementRef}
          className="origin-center will-change-transform motion-reduce:scale-100"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
