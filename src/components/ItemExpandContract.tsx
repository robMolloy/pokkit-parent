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

      const width = container!.clientWidth

      element!.style.width = `${width}px`
      element!.style.height = ''

      if (prefersReducedMotion) {
        element!.style.transform = 'scale(1, 1)'
        return
      }

      const minScaleX = Math.min(MIN_EXPAND_PX / width, 1)

      animation = element!.animate(
        [
          { transform: `scale(${minScaleX}, 1)` },
          { transform: 'scale(1, 1)' },
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
        Content slowly expands to the full width of the container, then
        contracts horizontally without changing height. Each
        movement takes {phase} {phase === 1 ? 'second' : 'seconds'} and
        repeats.
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
          className="flex origin-center items-center justify-center will-change-transform motion-reduce:scale-100"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
