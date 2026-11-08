import { useEffect, useRef, useState } from 'react'
import '../../styles/case-study.css'

/*
 * Building blocks for case study pages, styled with the Orchard type scale:
 *   eyebrow  Space Mono 12/18 (tag/default), uppercase
 *   h1       Chewy 64/72 (heading/h1)        h2  Chewy 48/56 (heading/h2)
 *   h3       Chewy 32/40 (heading/h3)        h4  Chewy 24/32 (heading/card)
 *   body     MADE Okine Sans / Outfit 20/30 lead, 16/24 default, 14/22 captions
 */

export function CaseSection({ id, eyebrow, title, children, wide = false }) {
  const headingId = `${id}-title`
  return (
    <section className={`cs-section${wide ? ' cs-section--wide' : ''}`} aria-labelledby={headingId}>
      {eyebrow && <p className="cs-eyebrow">{eyebrow}</p>}
      <h2 id={headingId} className="cs-h2">{title}</h2>
      {children}
    </section>
  )
}

export function Figure({ src, alt, caption, className = '', width, height }) {
  return (
    <figure className={`cs-figure ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" width={width} height={height} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Pros/cons under a design option. The ✓ / ✕ icons are paired with visually hidden labels. */
export function ProsCons({ pros = [], cons = [] }) {
  return (
    <ul className="cs-proscons">
      {pros.map((t) => (
        <li key={t} className="is-pro">
          <CheckIcon />
          <span className="sr-only">Pro: </span>
          {t}
        </li>
      ))}
      {cons.map((t) => (
        <li key={t} className="is-con">
          <CrossIcon />
          <span className="sr-only">Con: </span>
          {t}
        </li>
      ))}
    </ul>
  )
}

/**
 * Design option A/B/C with an image, an optional "chosen" mark and its pros/cons.
 * Pass `image` + `alt` for one picture, or `images` ([{ src, alt, width }]) to stack several;
 * `width` is the CSS width in px for 2× exports, so mockups keep their designed size.
 */
export function Option({ label, title, chosen = false, image, alt, images, pros, cons, imageClassName = '', level = 3 }) {
  const Heading = `h${level}` // keep the outline unbroken: h3 under a section, h4 under a subsection
  return (
    <div className={`cs-option${chosen ? ' is-chosen' : ''}`}>
      <Heading className="cs-option__title">
        <span className="cs-option__label">{label}.</span> {title}
        {chosen && (
          <span className="cs-option__chosen">
            <CheckIcon />
            <span className="sr-only"> (chosen)</span>
          </span>
        )}
      </Heading>
      {image && <img className={`cs-option__img ${imageClassName}`} src={image} alt={alt} loading="lazy" decoding="async" />}
      {images && (
        <div className="cs-option__stack">
          {images.map((img) => (
            <img
              key={img.src}
              className={`cs-option__img cs-option__img--sized ${imageClassName}`}
              src={img.src}
              alt={img.alt}
              style={img.width ? { width: img.width } : undefined}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}
      <ProsCons pros={pros} cons={cons} />
    </div>
  )
}

/**
 * Looping, muted product video. Autoplays only when motion is OK and it's on screen, and always
 * has a visible pause/play button (WCAG 2.2.2: moving content longer than 5s must be pausable).
 */
export function LoopVideo({ src, label, className = '' }) {
  const ref = useRef(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [playing, setPlaying] = useState(false)
  const userPaused = useRef(reduced)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.3 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = ref.current
    if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  return (
    <figure className={`cs-video ${className}`}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="cs-video__toggle" onClick={toggle} aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
        )}
      </button>
    </figure>
  )
}

export function CheckIcon() {
  return (
    <svg className="cs-icon cs-icon--check" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CrossIcon() {
  return (
    <svg className="cs-icon cs-icon--cross" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
