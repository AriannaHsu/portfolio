import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowUpRight from '../ArrowUpRight'

const TYPE_MS = 38
const ERASE_MS = 16
const HOLD_MS = 2600
const GAP_MS = 250
const REDUCED_HOLD_MS = 4500

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Typed characters (highlighted segments keep their colour), then the caret, then the rest of the
// line kept invisible to hold its place.
function renderTyped(segments, shown, caret) {
  const typed = []
  const rest = []
  let start = 0
  segments.forEach((seg, i) => {
    const cut = Math.max(0, Math.min(seg.text.length, shown - start))
    const cls = seg.hi ? 'tagline__hi' : undefined
    if (cut > 0) typed.push(<span key={`t${i}`} className={cls}>{seg.text.slice(0, cut)}</span>)
    if (cut < seg.text.length) {
      rest.push(<span key={`r${i}`} className={`tagline__pending${cls ? ` ${cls}` : ''}`}>{seg.text.slice(cut)}</span>)
    }
    start += seg.text.length
  })
  return [...typed, caret, ...rest]
}

/**
 * Types one line per project, with an arrow link to that case study.
 *
 * Accessibility:
 * - The animated text is aria-hidden; screen readers get one static sentence listing every project.
 * - Hover or keyboard focus pauses the cycle and completes the current line, so the arrow's target
 *   and label stay put while someone reaches for it.
 * - A pause/play button satisfies WCAG 2.2.2 (Pause, Stop, Hide) for auto-updating content.
 * - With reduced motion, lines swap whole with a fade instead of typing.
 */
export default function TypedTagline({ lines }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [chars, setChars] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | holding | erasing
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [stopped, setStopped] = useState(false)

  const line = lines[index]
  const paused = hovered || focused || stopped
  const shownChars = reduced || paused ? line.text.length : chars

  useEffect(() => {
    if (paused) return
    let delay
    let step
    if (reduced) {
      delay = REDUCED_HOLD_MS
      step = () => setIndex((i) => (i + 1) % lines.length)
    } else if (phase === 'typing') {
      if (chars < line.text.length) { delay = TYPE_MS; step = () => setChars((c) => c + 1) }
      else { delay = 0; step = () => setPhase('holding') }
    } else if (phase === 'holding') {
      delay = HOLD_MS
      step = () => setPhase('erasing')
    } else if (chars > 0) {
      delay = ERASE_MS
      step = () => setChars((c) => Math.max(0, c - 2))
    } else {
      delay = GAP_MS
      step = () => { setIndex((i) => (i + 1) % lines.length); setPhase('typing') }
    }
    const t = setTimeout(step, delay)
    return () => clearTimeout(t)
  }, [paused, reduced, phase, chars, line.text.length, lines.length])

  // Pausing shows the full line, so resuming continues from it instead of jumping back to a partial one.
  const freezeLine = () => { setChars(line.text.length); setPhase('holding') }

  const complete = shownChars >= line.text.length

  return (
    <div
      className="tagline"
      onMouseEnter={() => { freezeLine(); setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => { freezeLine(); setFocused(true) }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}
    >
      <p className="sr-only">
        {lines.map((l) => l.text).join('; ')}.
      </p>

      {/* The whole line is the link (text + arrow), so the "View case study" cursor and the click
          target match. Its name starts with the visible line, then says where it goes. */}
      <p className="tagline__line">
        <Link
          to={`/work/${line.slug}`}
          className={`tagline__link${complete ? ' is-ready' : ''}`}
          data-cursor="case-study"
          data-cursor-label={`View ${line.title}`}
          aria-label={`${line.text}: read the ${line.title} case study`}
        >
          {/* The whole line is always laid out (untyped part invisible), so it wraps once, balanced,
              instead of words jumping between lines as they're typed. */}
          <span key={reduced ? index : undefined} className={`tagline__text${reduced ? ' tagline__fade' : ''}`} aria-hidden="true">
            {renderTyped(line.segments, shownChars, !reduced && (
              <span key="caret" className={`tagline__caret${paused || complete ? ' is-paused' : ''}`} />
            ))}
          </span>
          {/* Arrow appears once the line is complete; its slot is always reserved so the line doesn't shift. */}
          <span className="tagline__end" aria-hidden="true">
            <span className="tagline__arrow">
              <ArrowUpRight />
            </span>
          </span>
        </Link>
      </p>

      <button
        type="button"
        className="tagline__pause"
        onClick={() => { if (!stopped) freezeLine(); setStopped((s) => !s) }}
        aria-pressed={stopped}
        aria-label={stopped ? 'Resume project tagline animation' : 'Pause project tagline animation'}
      >
        <span aria-hidden="true">{stopped ? '▶' : '❚❚'}</span>
      </button>
    </div>
  )
}
