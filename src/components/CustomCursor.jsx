import { useEffect, useRef, useState } from 'react'

/**
 * Blue dot that follows the mouse and expands into an "👁 View case study" pill over any
 * element marked data-cursor="case-study" (project cards, the tagline).
 * An optional data-cursor-label overrides the text, e.g. "View InterACT".
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
      setLabel(target ? target.dataset.cursorLabel || 'View case study' : null)
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
      {label && (
        <>
          <svg className="custom-cursor__icon" viewBox="0 0 24 24" width="20" height="20" fill="none" focusable="false">
            <path
              d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </div>
  )
}
