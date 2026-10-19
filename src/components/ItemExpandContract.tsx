import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from 'cn'

const MIN_EXPAND_PX = 8

type ItemExpandContractProps = {
  children: ReactNode
  className?: string
  /** Classes on the clip region (default shrink-wraps content; pass a height to define a fill region). */
  containerClassName?: string
  /** Seconds for one expand or one contract (full cycle is twice this). */
  duration: number
  /**
   * When true, the animated element is sized to the clip (use with a fixed clip height).
   * When false, the clip and motion layout follow child content size.
   */
  fillContainer?: boolean
}

export function ItemExpandContract({
  children,
  className,
  containerClassName,
  duration,
  fillContainer = true,
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

      const width = container!.clientWidth
      const height = container!.clientHeight

      if (fillContainer) {
        element!.style.width = `${width}px`
        element!.style.height = `${height}px`
      } else {
        element!.style.width = ''
        element!.style.height = ''
      }

      if (prefersReducedMotion) {
        element!.style.transform = 'scale(1)'
        return
      }

      const measureWidth = fillContainer ? width : element!.offsetWidth
      const measureHeight = fillContainer ? height : element!.offsetHeight

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
    if (!fillContainer) {
      observer.observe(element)
    }

    updateAnimation()

    return () => {
      observer.disconnect()
      animation?.cancel()
    }
  }, [durationMs, fillContainer])

  return (
    <div className={className}>
      <p className="sr-only">
        Content slowly expands to fill the container, then contracts. Each
        movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and
        repeats.
      </p>
      <div
        ref={containerRef}
        className={cn(
          'flex h-auto w-full items-center justify-center overflow-hidden',
          containerClassName,
        )}
      >
        <div
          ref={elementRef}
          className={cn(
            'origin-center will-change-transform motion-reduce:scale-100',
            !fillContainer && 'w-full',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
