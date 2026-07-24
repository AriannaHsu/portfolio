import { Link } from 'react-router-dom'
import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { projects } from '../data/projects'

function Thumbnail({ label }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '4 / 3',
      background: `repeating-linear-gradient(
        -45deg,
        var(--bg-surface) 0px,
        var(--bg-surface) 8px,
        var(--border) 8px,
        var(--border) 9px
      )`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      flexShrink: 0,
      borderRadius: '8px',
    }}>
      <span style={{
        fontFamily: 'var(--font-system)',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        opacity: 0.7,
        letterSpacing: '0.04em',
      }}>
        [ {label} ]
      </span>
    </div>
  )
}

const HEART_PALETTE = ['#2E1F52', '#5A4E85', '#9B6FE0', '#C9B8E8']
const HEART_BOX = 280
const HEART_MARGIN = 22

// Precompute each dot's scatter position and its position on the heart
// outline (parametric heart curve, normalized/scaled to fit the box).
function buildHeartDots(n) {
  const raw = []
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    raw.push({ x, y })
  }

  const xs = raw.map((p) => p.x)
  const ys = raw.map((p) => p.y)
  const midX = (Math.min(...xs) + Math.max(...xs)) / 2
  const midY = (Math.min(...ys) + Math.max(...ys)) / 2
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))
  const scale = (HEART_BOX - HEART_MARGIN * 2) / span
  const center = HEART_BOX / 2

  return raw.map((p) => ({
    xh: center + (p.x - midX) * scale,
    yh: center - (p.y - midY) * scale, // flip: formula's "up" is screen "up"
    x0: HEART_MARGIN + Math.random() * (HEART_BOX - HEART_MARGIN * 2),
    y0: HEART_MARGIN + Math.random() * (HEART_BOX - HEART_MARGIN * 2),
    size: 6 + Math.random() * 7,
    color: HEART_PALETTE[Math.floor(Math.random() * HEART_PALETTE.length)],
  }))
}

function HeartDots() {
  const dots = useMemo(() => buildHeartDots(20), [])
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: '0 0 280px',
        width: '280px',
        height: '280px',
        position: 'relative',
      }}
    >
      {dots.map((dot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: (hover ? dot.xh : dot.x0) + 'px',
            top: (hover ? dot.yh : dot.y0) + 'px',
            width: dot.size + 'px',
            height: dot.size + 'px',
            borderRadius: '50%',
            background: dot.color,
            transform: 'translate(-50%, -50%)',
            transition: 'left .85s cubic-bezier(.22,1,.36,1), top .85s cubic-bezier(.22,1,.36,1)',
            willChange: 'left, top',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const pillRef = useRef(null)
  const [hoveringCard, setHoveringCard] = useState(false)

  // Custom cursor: hide the native cursor and track mouse position while on this page.
  useEffect(() => {
    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    const handleMove = (e) => {
      const pill = pillRef.current
      if (!pill) return
      pill.style.left = e.clientX + 'px'
      pill.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', handleMove)

    return () => {
      document.body.style.cursor = prevCursor
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  const handleCardEnter = useCallback(() => setHoveringCard(true), [])
  const handleCardLeave = useCallback(() => setHoveringCard(false), [])

  return (
    <>
      {/* Custom cursor: purple circle that expands into a "View case study" pill over cards */}
      <div
        ref={pillRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: 1000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s cubic-bezier(.22,1,.36,1), height 0.2s cubic-bezier(.22,1,.36,1), padding 0.2s cubic-bezier(.22,1,.36,1), border-radius 0.2s ease',
          background: 'var(--accent-text)',
          color: 'var(--bg-surface)',
          borderRadius: hoveringCard ? '999px' : '50%',
          width: hoveringCard ? 'auto' : '14px',
          height: hoveringCard ? 'auto' : '14px',
          padding: hoveringCard ? '10px 20px' : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-system)',
          fontSize: '12px',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        {hoveringCard ? 'View case study →' : null}
      </div>

      {/* Hero */}
      <section style={{ padding: '80px 48px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '56px', flexWrap: 'wrap' }}>
          {/* Left column: text */}
          <div style={{ flex: '1 1 420px' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4vw, 46px)',
              lineHeight: 1.24,
              letterSpacing: '-0.01em',
              fontWeight: 400,
              color: 'var(--text-primary)',
              maxWidth: '720px',
              margin: 0,
            }}>
              COMPLEXITY TO CLARITY. 
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px',
              color: 'var(--text-primary)',
              margin: '20px 0 0',
            }}>
              I create tools delivering the right info at the right moment. 
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--text-secondary)',
              margin: '14px 0 0',
            }}>
              Leading design @ Hack4Impact
            </p>
          </div>

          {/* Right column: dot-to-heart interaction */}
          <HeartDots />
        </div>
      </section>

      {/* Gallery */}
      <section style={{ paddingBottom: '80px' }}>
        {/* Section eyebrow */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '16px 48px' }}>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 28px' }}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              style={{
                padding: '28px',
                display: 'block',
              }}
            >
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', marginBottom: '16px', borderRadius: '8px' }}
                />
              ) : (
                <Thumbnail label={project.thumbnailLabel || project.title} />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '21px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  {project.title}
                </h2>

                <span style={{
                  fontFamily: 'var(--font-system)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                }}>
                  {project.meta}
                </span>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
                margin: '8px 0 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {project.tagline || ' '}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
