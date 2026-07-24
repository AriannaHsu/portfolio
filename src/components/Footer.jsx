import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const mono = { fontFamily: 'var(--font-system)' }

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

  useEffect(() => {
    const onResize = () => setStats(s => ({ ...s, viewport: `${window.innerWidth}×${window.innerHeight}` }))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', padding: '80px 48px 40px' }}>

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
    </footer>
  )
}
