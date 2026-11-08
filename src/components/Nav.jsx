import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBasket } from '../context/BasketContext'
import LiquidGlassFilter, { supportsLiquidGlass } from './LiquidGlassFilter'

const navLinks = [
  { to: '/', label: 'work', match: (p) => p === '/' || p.startsWith('/work') },
  { to: '/about', label: 'about', match: (p) => p.startsWith('/about') },
  { to: '/gallery', label: 'basket', isBasket: true, match: (p) => p.startsWith('/gallery') },
]

export default function Nav() {
  const { basketRef, bumpKey } = useBasket()
  const { pathname } = useLocation()
  const pillRef = useRef(null)
  const linkRefs = useRef([])
  const [indicator, setIndicator] = useState(null)
  const [animate, setAnimate] = useState(false)
  const [theme, setTheme] = useState('sky')

  // Match the zone under the pill: whichever [data-nav-theme] section sits beneath its centre.
  // Sections without one (other pages) fall back to sky.
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const pill = pillRef.current
      if (!pill) return
      const r = pill.getBoundingClientRect()
      const under = document
        .elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
        .find((el) => !pill.contains(el) && el.closest('[data-nav-theme]'))
      setTheme(under?.closest('[data-nav-theme]').dataset.navTheme ?? 'sky')
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  const activeIndex = navLinks.findIndex((l) => l.match(pathname))

  // Measure the active link so the glass "droplet" can slide to it.
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeIndex]
      const pill = pillRef.current
      if (!el || !pill) return setIndicator(null)
      // position relative to the pill's padding box (links sit inside positioned <li>s)
      const a = el.getBoundingClientRect()
      const b = pill.getBoundingClientRect()
      setIndicator({ x: a.left - b.left - pill.clientLeft, y: a.top - b.top - pill.clientTop, w: a.width, h: a.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (pillRef.current) ro.observe(pillRef.current)
    document.fonts?.ready.then(measure) // web fonts change link widths after first paint
    return () => ro.disconnect()
  }, [activeIndex])

  // Turn on the slide only after the first placement, so it doesn't fly in from 0 on load.
  useLayoutEffect(() => {
    if (indicator && !animate) requestAnimationFrame(() => setAnimate(true))
  }, [indicator, animate])

  return (
    <nav className="site-nav" data-theme={theme} aria-label="Main">
      <LiquidGlassFilter id="nav-glass" targetRef={pillRef} />
      <ul ref={pillRef} className={`site-nav__pill${supportsLiquidGlass ? ' is-liquid' : ''}`}>
        {indicator && (
          <span
            className={`site-nav__indicator${animate ? ' is-animated' : ''}`}
            aria-hidden="true"
            style={{ width: indicator.w, height: indicator.h, transform: `translate(${indicator.x}px, ${indicator.y}px)` }}
          />
        )}
        {navLinks.map(({ to, label, isBasket }, i) => {
          const active = i === activeIndex
          return (
            <li key={to}>
              <Link
                to={to}
                ref={(el) => {
                  linkRefs.current[i] = el
                  if (isBasket) basketRef.current = el
                }}
                className={`site-nav__link${active ? ' is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {/* key change restarts the bump animation each time an apple lands */}
                <span key={isBasket ? bumpKey : undefined} className={`site-nav__label${isBasket && bumpKey > 0 ? ' basket-bump' : ''}`}>
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
