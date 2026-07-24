import { Link } from 'react-router-dom'
import { useRef, useState, useMemo, useCallback } from 'react'
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
  const wasHoveringRef = useRef(false)
  const leavingTimerRef = useRef(null)

  // Cursor pill handlers
  const handleCardEnter = useCallback(() => {
    clearTimeout(leavingTimerRef.current)
    const pill = pillRef.current
    if (!pill) return
    if (wasHoveringRef.current) {
      pill.style.transform = 'translate(-50%, -50%) scale(0)'
      setTimeout(() => {
        if (pillRef.current) pillRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }, 160)
    } else {
      pill.style.transform = 'translate(-50%, -50%) scale(1)'
    }
    wasHoveringRef.current = true
  }, [])

  const handleCardLeave = useCallback(() => {
    const pill = pillRef.current
    if (pill) pill.style.transform = 'translate(-50%, -50%) scale(0)'
    leavingTimerRef.current = setTimeout(() => {
      wasHoveringRef.current = false
    }, 200)
  }, [])

  const handleCardMouseMove = useCallback((e) => {
    const pill = pillRef.current
    if (!pill) return
    pill.style.left = e.clientX + 'px'
    pill.style.top = e.clientY + 'px'
  }, [])

  return (
    <>
      {/* Cursor pill */}
      <div
        ref={pillRef}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 1000,
          transform: 'translate(-50%, -50%) scale(0)',
          transition: 'transform 0.16s ease',
          background: 'var(--text-primary)',
          color: 'var(--bg-surface)',
          borderRadius: '999px',
          padding: '10px 20px',
          fontFamily: 'var(--font-system)',
          fontSize: '12px',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      >
        View case study →
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
              I turn complexity into tools people can act on.
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px',
              color: 'var(--text-primary)',
              margin: '20px 0 0',
            }}>
              Right moment. Right info.
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
          <span style={{
            fontFamily: 'var(--font-system)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)',
          }}>
            Selected work
          </span>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1px', background: 'var(--border)' }}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              onMouseMove={handleCardMouseMove}
              style={{
                flex: '1 1 320px',
                background: 'var(--bg-surface)',
                padding: '28px',
                display: 'block',
                cursor: 'none',
              }}
            >
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', marginBottom: '16px' }}
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
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
