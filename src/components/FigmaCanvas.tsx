import { useEffect, useMemo, useRef, useState } from 'react'

const FIGMA_WIDTH = 1440
/** Below this viewport width: no zoom shrink — typography matches real px (Tailwind `md`). */
const FLUID_BREAKPOINT = 768

function computeLayout() {
  if (typeof window === 'undefined') {
    return { scale: 1 as number, fluid: false }
  }
  const w = window.innerWidth
  if (w < FLUID_BREAKPOINT) {
    return { scale: 1, fluid: true }
  }
  return { scale: Math.min(1, w / FIGMA_WIDTH), fluid: false }
}

export default function FigmaCanvas({
  children,
}: {
  children: React.ReactNode
}) {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [layout, setLayout] = useState(() => computeLayout())
  const [canvasHeight, setCanvasHeight] = useState<number>(0)

  const style = useMemo(
    () =>
      ({
        ['--figma-scale' as never]: layout.scale,
        ['--figma-canvas-height' as never]: canvasHeight,
      }) as React.CSSProperties,
    [layout.scale, canvasHeight],
  )

  useEffect(() => {
    function update() {
      setLayout(computeLayout())
      // Measure unscaled height (layout height at 1x).
      // In zoom-support browsers, wrapper height isn't needed but harmless.
      const el = canvasRef.current
      if (el) setCanvasHeight(el.scrollHeight)
    }

    update()
    window.addEventListener('resize', update)

    const el = canvasRef.current
    const ro =
      typeof ResizeObserver !== 'undefined' && el
        ? new ResizeObserver(() => update())
        : null
    if (ro && el) ro.observe(el)

    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  return (
    <div className="figmaViewport" style={style}>
      <div className="figmaCanvasWrapper">
        <div
          ref={canvasRef}
          className={
            layout.fluid ? 'figmaCanvas figmaCanvas--fluid' : 'figmaCanvas'
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}

