import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASKET_WORLD, basketItems } from '../data/basket'

/*
 * Basket (Figma 93:520): an endless watercolor basket-weave canvas you drag around.
 *
 * Each card wraps around the world tile on its own, so there's exactly one copy of every card in
 * the DOM (real, focusable, no hidden duplicates) and the canvas still never runs out. The world
 * tile is always wider/taller than the viewport plus a card, so a card only ever wraps while it's
 * off-screen.
 *
 * Ways to move (WCAG 2.5.7: dragging always has a single-pointer alternative):
 *   drag (mouse/touch) · scroll wheel / trackpad · ‹ › buttons · Tab to a card · arrow keys.
 * The page has no footer (App.jsx), so the canvas fills the screen and nothing is trapped below it.
 */

const CARD_PAD = 16 // padding on each side of the photo (Figma 20, cards drawn at 0.8)
const META_H = 44 // 16px gap + 28px title line, revealed on expand
const DRAG_THRESHOLD = 6
const KEY_STEP = 120
// Weave tile is sized so about four tiles' worth fills the screen (2 × 2 by area). That draws the
// 1125px source at roughly half size on a laptop, so it stays crisp.
const weaveTileSize = (vw, vh) => Math.round(Math.max(240, Math.sqrt((vw * vh) / 4)))

const mod = (n, m) => ((n % m) + m) % m

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function measure(viewport) {
  const vw = viewport.clientWidth
  const vh = viewport.clientHeight
  // Phones: shrink the cards so even the widest one fits with a margin.
  const widest = Math.max(...basketItems.map((it) => it.imageWidth + CARD_PAD * 2))
  // Cards are drawn at 0.8 of the Figma size; phones shrink further so the widest one fits.
  const scale = vw < 640 ? Math.min(0.5, (vw - 48) / widest) : 0.8
  const sizes = basketItems.map((item) => ({
    w: item.imageWidth * scale + CARD_PAD * 2,
    h: item.imageHeight * scale + CARD_PAD * 2 + META_H,
  }))
  const maxW = Math.max(...sizes.map((s) => s.w))
  const maxH = Math.max(...sizes.map((s) => s.h))
  return {
    vw,
    vh,
    scale,
    sizes,
    W: Math.max(BASKET_WORLD.width * scale, vw + maxW + 80),
    H: Math.max(BASKET_WORLD.height * scale, vh + maxH + 80),
  }
}

export default function Gallery() {
  const reduced = usePrefersReducedMotion()
  const viewportRef = useRef(null)
  const slotRefs = useRef([])
  const dims = useRef(null)
  const pan = useRef(null) // { x, y } offset of the world, set once we know the viewport size
  const velocity = useRef({ x: 0, y: 0 })
  const anim = useRef(0)
  const drag = useRef(null)
  const suppressClick = useRef(false)
  const current = useRef(0)
  const [scale, setScale] = useState(1)
  const [weaveSize, setWeaveSize] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [openId, setOpenId] = useState(null)

  // Where card i sits on screen right now.
  const cardScreenPos = useCallback((i) => {
    const d = dims.current
    const item = basketItems[i]
    const { w, h } = d.sizes[i]
    return {
      x: mod(item.x * d.scale + pan.current.x + w, d.W) - w,
      y: mod(item.y * d.scale + pan.current.y + h, d.H) - h,
      w,
      h,
    }
  }, [])

  // Paint: move each card and the weave. Runs per frame while panning, no React re-render.
  const paint = useCallback(() => {
    const d = dims.current
    const viewport = viewportRef.current
    if (!d || !viewport || !pan.current) return
    basketItems.forEach((_, i) => {
      const el = slotRefs.current[i]
      if (!el) return
      const { x, y } = cardScreenPos(i)
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    })
    viewport.style.backgroundPosition = `${pan.current.x}px ${pan.current.y}px`
  }, [cardScreenPos])

  const stopMotion = useCallback(() => {
    cancelAnimationFrame(anim.current)
    anim.current = 0
  }, [])

  // Size the world to the viewport; first time, centre the Figma layout in view.
  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const update = () => {
      const d = measure(viewport)
      dims.current = d
      if (!pan.current) {
        // Start with the cluster of cards centred (a little below centre, clear of the nav).
        const left = Math.min(...basketItems.map((it) => it.x)) * d.scale
        const top = Math.min(...basketItems.map((it) => it.y)) * d.scale
        const right = Math.max(...basketItems.map((it, i) => it.x * d.scale + d.sizes[i].w))
        const bottom = Math.max(...basketItems.map((it, i) => it.y * d.scale + d.sizes[i].h - META_H))
        pan.current = {
          x: (d.vw - (left + right)) / 2,
          y: (d.vh - (top + bottom)) / 2 + 30,
        }
      }
      setScale(d.scale)
      setWeaveSize(weaveTileSize(d.vw, d.vh))
      paint()
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [paint])

  useEffect(() => stopMotion, [stopMotion])

  const glideTo = useCallback(
    (target) => {
      stopMotion()
      if (reduced) {
        pan.current = target
        paint()
        return
      }
      const from = { ...pan.current }
      const start = performance.now()
      const DURATION = 650
      const step = (now) => {
        const t = Math.min(1, (now - start) / DURATION)
        const e = 1 - Math.pow(1 - t, 4) // ease-out quart: quick start, gentle settle
        pan.current = { x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e }
        paint()
        anim.current = t < 1 ? requestAnimationFrame(step) : 0
      }
      anim.current = requestAnimationFrame(step)
    },
    [paint, reduced, stopMotion],
  )

  // Bring card i to the middle of the screen.
  const centreCard = useCallback(
    (i, { onlyIfHidden = false } = {}) => {
      const d = dims.current
      const p = cardScreenPos(i)
      // Usable area: below the nav, above the ‹ › controls.
      const top = 100
      const bottom = d.vh - 84
      const margin = 24
      const visible = p.x >= margin && p.y >= top && p.x + p.w <= d.vw - margin && p.y + p.h <= bottom
      if (onlyIfHidden && visible) return
      current.current = i
      glideTo({
        x: pan.current.x + (d.vw - p.w) / 2 - p.x,
        y: pan.current.y + top + Math.max(0, (bottom - top - p.h) / 2) - p.y,
      })
    },
    [cardScreenPos, glideTo],
  )

  const flick = useCallback(() => {
    stopMotion()
    let last = performance.now()
    const step = (now) => {
      const dt = Math.min(32, now - last)
      last = now
      const v = velocity.current
      const decay = Math.pow(0.94, dt / 16)
      v.x *= decay
      v.y *= decay
      pan.current = { x: pan.current.x + v.x * dt, y: pan.current.y + v.y * dt }
      paint()
      anim.current = Math.hypot(v.x, v.y) > 0.02 ? requestAnimationFrame(step) : 0
    }
    anim.current = requestAnimationFrame(step)
  }, [paint, stopMotion])

  // ── Dragging. Pointer capture only starts once it's clearly a drag, so taps still reach cards.
  const onPointerDown = (e) => {
    if (e.button !== 0) return
    stopMotion()
    velocity.current = { x: 0, y: 0 }
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      d.moved = true
      viewportRef.current.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    const now = performance.now()
    const dt = Math.max(1, now - d.t)
    velocity.current = { x: dx / dt, y: dy / dt }
    Object.assign(d, { x: e.clientX, y: e.clientY, t: now })
    pan.current = { x: pan.current.x + dx, y: pan.current.y + dy }
    paint()
  }
  const endDrag = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    drag.current = null
    if (!d.moved) return
    setDragging(false)
    suppressClick.current = true
    setTimeout(() => { suppressClick.current = false }, 0)
    const stale = performance.now() - d.t > 80 // paused before letting go: no fling
    if (!reduced && !stale) flick()
  }
  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // The canvas is the whole page (no footer here), so the wheel / trackpad pans it in both axes.
  // Shift + wheel pans sideways for mice without a horizontal wheel.
  useEffect(() => {
    const viewport = viewportRef.current
    const onWheel = (e) => {
      if (e.ctrlKey) return // leave pinch-zoom to the browser
      e.preventDefault()
      stopMotion()
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX
      const dy = e.shiftKey ? 0 : e.deltaY
      pan.current = { x: pan.current.x - dx, y: pan.current.y - dy }
      paint()
    }
    viewport.addEventListener('wheel', onWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', onWheel)
  }, [paint, stopMotion])

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return setOpenId(null)
    const dir = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key]
    if (!dir) return
    e.preventDefault()
    glideTo({ x: pan.current.x + dir[0] * KEY_STEP, y: pan.current.y + dir[1] * KEY_STEP })
  }

  const step = (by) => {
    const next = mod(current.current + by, basketItems.length)
    centreCard(next)
    setOpenId(basketItems[next].id)
  }

  // Tapping the weave (not a card) closes an open card.
  const onBackgroundClick = (e) => {
    if (!e.target.closest('.basket-card')) setOpenId(null)
  }

  return (
    <main className="basket" data-nav-theme="earth">
      <h1 className="sr-only">Basket</h1>
      <p id="basket-help" className="sr-only">
        Things I make outside of work. Drag the woven canvas to wander, or use the arrow keys and the
        previous and next buttons. Each card opens to show what it is.
      </p>

      <div
        ref={viewportRef}
        className={`basket__canvas${dragging ? ' is-dragging' : ''}`}
        style={weaveSize ? { backgroundSize: `${weaveSize}px ${weaveSize}px` } : undefined}
        role="region"
        aria-roledescription="canvas"
        aria-label="Basket"
        aria-describedby="basket-help"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onClick={onBackgroundClick}
        onKeyDown={onKeyDown}
      >
        <ul className="basket__items">
          {basketItems.map((item, i) => {
            const open = openId === item.id
            const content = (
              <>
                <img
                  className="basket-card__img"
                  src={item.image}
                  alt={item.alt}
                  draggable="false"
                  style={{
                    width: item.imageWidth * scale,
                    height: item.imageHeight * scale,
                    objectPosition: item.objectPosition,
                  }}
                />
                <span className="basket-card__more">
                  <span className="basket-card__meta">
                    <span className="basket-card__title">{item.title}</span>
                    <span className="basket-card__tag">{item.tag}</span>
                  </span>
                </span>
              </>
            )
            const shared = {
              className: `basket-card${open ? ' is-open' : ''}`,
              onFocus: (e) => {
                if (e.currentTarget.matches(':focus-visible')) {
                  centreCard(i, { onlyIfHidden: true })
                  current.current = i
                }
              },
            }
            return (
              <li key={item.id} ref={(el) => { slotRefs.current[i] = el }} className="basket__slot">
                {item.to ? (
                  <Link to={item.to} data-cursor="case-study" {...shared}>{content}</Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => {
                      current.current = i
                      setOpenId(open ? null : item.id)
                    }}
                    {...shared}
                  >
                    {content}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="basket__controls">
        <button type="button" className="basket__step" onClick={() => step(-1)} aria-label="Previous item">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Mouse/trackpad: scrolling pans. Touch: dragging pans. Swapped in CSS by pointer type. */}
        <p className="basket__hint" aria-hidden="true">
          <span className="basket__hint--pointer">scroll to wander</span>
          <span className="basket__hint--touch">drag to wander</span>
        </p>
        <button type="button" className="basket__step" onClick={() => step(1)} aria-label="Next item">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </main>
  )
}
