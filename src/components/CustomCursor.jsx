import { useEffect, useRef, useState } from 'react'

/**
 * Blue dot that follows the mouse and expands into a "View case study →" pill over any
 * element marked data-cursor="case-study" (project cards, the tagline arrow).
 *
 * Only runs for a precise pointer (mouse/trackpad); touch and keyboard users keep the
 * normal behaviour. Stays hidden until the mouse first moves, so it never sits stuck at 0,0.
 */
export default function CustomCursor() {
  const ref = useRef(null)
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState(null)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      const el = ref.current
      if (!el) return
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      setVisible(true)
    }
    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor="case-study"]')
      setLabel(target ? 'View case study →' : null)
    }
    const onLeaveWindow = () => setVisible(false)

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeaveWindow)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      className={`custom-cursor${label ? ' is-expanded' : ''}${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      {label}
    </div>
  )
}
