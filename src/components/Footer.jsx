import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import footerSunset from '../assets/footer-sunset.jpg'

const mono = { fontFamily: 'var(--font-system)' }

const BRUSH_WIDTH = 340
const BRUSH_HEIGHT = 190
const BRUSH_SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'><path d='M15,110 C5,80 25,45 60,35 C90,26 100,50 130,40 C165,28 175,5 215,10 C250,15 265,40 290,55 C310,66 300,95 275,100 C250,105 245,130 210,135 C180,140 165,120 135,130 C100,142 70,150 45,135 C20,121 22,130 15,110 Z' fill='white'/></svg>`
const BRUSH_MASK_URL = `url("data:image/svg+xml,${encodeURIComponent(BRUSH_SVG)}")`

function StatCell({ label, value }) {
  return (
    <div>
      <p style={{ ...mono, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-text)', marginBottom: '6px' }}>
        {label}
      </p>
      <p style={{ ...mono, fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
        {value}
      </p>
    </div>
  )
}

function computeInitialStats() {
  const prev = parseInt(localStorage.getItem('ah_visits') || '0')
  const visits = prev + 1
  localStorage.setItem('ah_visits', String(visits))

  const nav = performance.getEntriesByType('navigation')[0]
  const loadTime = nav ? `${Math.round(nav.loadEventEnd - nav.startTime)}ms` : '—'

  const resources = performance.getEntriesByType('resource')
  const pageWeight = `${Math.round(resources.reduce((s, r) => s + (r.transferSize || 0), 0) / 1024)}kb`
  const requestCount = `${resources.length} requests`

  const viewport = `${window.innerWidth}×${window.innerHeight}`
  const connection = navigator?.connection?.effectiveType ?? '—'

  return { visits: String(visits), loadTime, pageWeight, requestCount, viewport, connection }
}

export default function Footer() {
  const [statsOpen, setStatsOpen] = useState(false)
  const [stats, setStats] = useState(computeInitialStats)
  const footerRef = useRef(null)
  const maskRef = useRef(null)

  useEffect(() => {
    const onResize = () => setStats(s => ({ ...s, viewport: `${window.innerWidth}×${window.innerHeight}` }))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleFooterMouseMove = useCallback((e) => {
    const footer = footerRef.current
    const mask = maskRef.current
    if (!footer || !mask) return
    const rect = footer.getBoundingClientRect()
    const x = e.clientX - rect.left - BRUSH_WIDTH / 2
    const y = e.clientY - rect.top - BRUSH_HEIGHT / 2
    const position = `${x}px ${y}px`
    mask.style.maskPosition = position
    mask.style.webkitMaskPosition = position
  }, [])

  const handleFooterEnter = useCallback(() => {
    if (maskRef.current) maskRef.current.style.opacity = '1'
  }, [])

  const handleFooterLeave = useCallback(() => {
    if (maskRef.current) maskRef.current.style.opacity = '0'
  }, [])

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleFooterMouseMove}
      onMouseEnter={handleFooterEnter}
      onMouseLeave={handleFooterLeave}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
    >
      <div
        ref={maskRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${footerSunset})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          maskImage: BRUSH_MASK_URL,
          WebkitMaskImage: BRUSH_MASK_URL,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskSize: `${BRUSH_WIDTH}px ${BRUSH_HEIGHT}px`,
          WebkitMaskSize: `${BRUSH_WIDTH}px ${BRUSH_HEIGHT}px`,
          maskPosition: '-9999px -9999px',
          WebkitMaskPosition: '-9999px -9999px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1126px', margin: '0 auto', boxSizing: 'border-box', padding: '80px 48px 40px' }}>

      {/* Three-column row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '48px', marginBottom: '64px' }}>

        {/* Left: italic serif quote */}
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontSize: '24px',
          color: 'var(--text-primary)',
          maxWidth: '320px',
          lineHeight: 1.3,
        }}>
          Created and creating for His glory.
        </p>

        {/* Middle: Connect */}
        <div>
          <p style={{ ...mono, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-text)', marginBottom: '16px' }}>
            Connect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Email', href: 'mailto:ach282@cornell.edu' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arianna-hsu/', external: true },
              { label: 'GitHub', href: '#' },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="footer-link"
                style={{ ...mono, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Page */}
        <div>
          <p style={{ ...mono, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-text)', marginBottom: '16px' }}>
            Page
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Work', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Gallery', to: '/gallery' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="footer-link"
                style={{ ...mono, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats for nerds */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
        <button
          onClick={() => setStatsOpen(o => !o)}
          style={{
            ...mono,
            fontSize: '11px',
            color: 'var(--text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ display: 'inline-block', transform: statsOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>›</span>
          stats for nerds
        </button>

        {statsOpen && (
          <div style={{
            marginTop: '16px',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
          }}>
            <StatCell label="Traffic" value={`${stats.visits} visit${stats.visits !== '1' ? 's' : ''} (this browser)`} />
            <StatCell label="Performance" value={`${stats.loadTime} load · ${stats.pageWeight} · ${stats.requestCount}`} />
            <StatCell label="Your session" value={`${stats.viewport} · ${stats.connection}`} />
            <StatCell label="Site" value={`React + Vite · ${new Date().getFullYear()}`} />
          </div>
        )}
      </div>
      </div>
    </footer>
  )
}
