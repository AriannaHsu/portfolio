import { useCallback, useEffect, useRef, useState } from 'react'
import { useBasket } from '../../context/BasketContext'
import treeSrc from '../../assets/hero/tree.webp'
import redA from '../../assets/hero/apple-red-a.webp'
import redB from '../../assets/hero/apple-red-b.webp'
import orangeA from '../../assets/hero/apple-orange-a.webp'
import orangeB from '../../assets/hero/apple-orange-b.webp'

// Positions come from the Figma hero (node 55:1867), as % of the tree box.
// x/y = apple centre, w = apple width as % of tree width, tilt in degrees.
const APPLES = [
  { id: 'red-b', src: redB, label: 'red apple', x: 34.8, y: 34.1, w: 8.4, tilt: -6 },
  { id: 'orange-a', src: orangeA, label: 'orange apple', x: 61.7, y: 27.7, w: 8.2, tilt: 8 },
  { id: 'orange-b', src: orangeB, label: 'orange apple', x: 20.0, y: 54.4, w: 9.4, tilt: 5 },
  { id: 'red-a', src: redA, label: 'red apple', x: 72.7, y: 47.7, w: 8.5, tilt: -10 },
]

const REGROW_MS = 3000
// Matches .apple--growing's animation in index.css (1.4s; 0.4s with reduced motion).
const GROW_MS = 1400
// On page load this apple grows in (after a short pause so it's noticed) instead of already hanging.
const FIRST_GROW = 0
const FIRST_GROW_DELAY_MS = 600
// Flight timeline: drop → bounce → rest on the ground → fly to the basket.
const DROP_MS = 450
const BOUNCE_MS = 170
const REST_MS = 1000
const ARC_MS = 800
const FLIGHT_MS = DROP_MS + BOUNCE_MS + REST_MS + ARC_MS

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Bakes the whole path into one keyframe list: drop with gravity, small bounce, rest on the
// ground for a beat, then a curved flight up into the nav basket while shrinking.
function buildFlightKeyframes(from, groundY, target) {
  const cx = from.left + from.width / 2
  const cy = from.top + from.height / 2
  const frames = []
  const at = (ms) => ms / FLIGHT_MS
  const push = (offset, x, y, scale, rotate, opacity = 1) =>
    frames.push({ offset, opacity, transform: `translate(${x - cx}px, ${y - cy}px) rotate(${rotate}deg) scale(${scale})` })

  const landY = Math.max(groundY, cy)
  const restX = cx + 6
  const restRotate = 24

  // drop (gravity: distance ∝ t²)
  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    push(at(DROP_MS * t), cx, cy + (landY - cy) * t * t, 1, 18 * t)
  }
  // bounce, settling into a slight tilt
  for (let i = 1; i <= 4; i++) {
    const t = i / 4
    push(at(DROP_MS + BOUNCE_MS * t), cx + 6 * t, landY - 22 * Math.sin(Math.PI * t), 1, 18 + (restRotate - 18) * t)
  }
  // rest on the ground
  push(at(DROP_MS + BOUNCE_MS + REST_MS), restX, landY, 1, restRotate)

  // fly to the basket
  const start = DROP_MS + BOUNCE_MS + REST_MS
  const p0 = { x: restX, y: landY }
  const p2 = { x: target.left + target.width / 2, y: target.top + target.height / 2 }
  const p1 = { x: (p0.x + p2.x) / 2, y: Math.min(p0.y, p2.y) - 160 }
  for (let i = 1; i <= 18; i++) {
    const s = easeInOutCubic(i / 18)
    const x = (1 - s) ** 2 * p0.x + 2 * (1 - s) * s * p1.x + s * s * p2.x
    const y = (1 - s) ** 2 * p0.y + 2 * (1 - s) * s * p1.y + s * s * p2.y
    push(at(start + ARC_MS * (i / 18)), x, y, 1 - 0.65 * s, restRotate + 340 * s, i === 18 ? 0.2 : 1)
  }
  return frames
}

export default function AppleTree() {
  const { addApple, basketRef } = useBasket()
  // 'on' = hanging, 'gone' = picked, 'growing' = growing in place (on load for the first apple, and after a pick)
  const [states, setStates] = useState(() => APPLES.map((_, i) => (i === FIRST_GROW ? 'growing' : 'on')))
  const [firstGrowDone, setFirstGrowDone] = useState(false)
  const [hasPicked, setHasPicked] = useState(false) // stop the discoverability wiggle once they've found it
  const treeRef = useRef(null)
  const buttonRefs = useRef([])
  const timers = useRef(new Set())

  const setState = (i, value) => setStates((s) => s.map((v, j) => (j === i ? value : v)))

  const later = useCallback((fn, ms) => {
    const t = setTimeout(() => { timers.current.delete(t); fn() }, ms)
    timers.current.add(t)
  }, [])

  // Back to 'on' (pickable) once the grow animation has played. A timer rather than animationend,
  // so the apple can't get stuck unclickable if the event is missed.
  const finishGrowing = useCallback((i, afterMs) => {
    later(() => setStates((s) => s.map((v, j) => (j === i && v === 'growing' ? 'on' : v))), afterMs + 50)
  }, [later])

  useEffect(() => {
    finishGrowing(FIRST_GROW, FIRST_GROW_DELAY_MS + GROW_MS)
    later(() => setFirstGrowDone(true), FIRST_GROW_DELAY_MS + GROW_MS + 50)
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [finishGrowing, later])

  const pick = useCallback((i) => {
    if (states[i] !== 'on') return
    const button = buttonRefs.current[i]
    const img = button?.querySelector('img')
    const basket = basketRef.current

    // Keep keyboard users on the tree: hand focus to the next apple still hanging.
    if (document.activeElement === button) {
      const next = APPLES.map((_, k) => (i + 1 + k) % APPLES.length).find((k) => k !== i && states[k] === 'on')
      if (next !== undefined) buttonRefs.current[next]?.focus()
    }

    setState(i, 'gone')
    setHasPicked(true)
    later(() => setState(i, 'growing'), REGROW_MS)
    finishGrowing(i, REGROW_MS + GROW_MS)

    if (prefersReducedMotion() || !img || !basket) {
      addApple()
      return
    }

    const from = img.getBoundingClientRect()
    const treeRect = treeRef.current.getBoundingClientRect()
    const clone = img.cloneNode()
    clone.alt = ''
    clone.className = 'apple-flight'
    Object.assign(clone.style, {
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
    })
    document.body.appendChild(clone)

    const groundY = treeRect.bottom - from.height * 0.5
    const anim = clone.animate(buildFlightKeyframes(from, groundY, basket.getBoundingClientRect()), {
      duration: FLIGHT_MS,
      easing: 'linear',
      fill: 'forwards',
    })
    anim.onfinish = () => { clone.remove(); addApple() }
    anim.oncancel = () => clone.remove()
  }, [states, addApple, basketRef, later, finishGrowing])

  return (
    <div
      ref={treeRef}
      className="tree"
      role="group"
      aria-label="Apple tree. Pick an apple to drop it into your basket."
    >
      <img className="tree__img" src={treeSrc} alt="" draggable="false" />
      {APPLES.map((apple, i) => {
        const state = states[i]
        return (
          <button
            key={apple.id}
            ref={(el) => (buttonRefs.current[i] = el)}
            type="button"
            className={`apple apple--${state}${i === 0 && !hasPicked ? ' apple--hint' : ''}`}
            style={{
              left: `${apple.x}%`,
              top: `${apple.y}%`,
              width: `${apple.w}%`,
              '--tilt': `${apple.tilt}deg`,
              '--grow-delay': i === FIRST_GROW && !firstGrowDone ? `${FIRST_GROW_DELAY_MS}ms` : undefined,
            }}
            onClick={() => pick(i)}
            aria-label={`Pick the ${apple.label}`}
            aria-hidden={state === 'gone' ? 'true' : undefined}
            tabIndex={state === 'gone' ? -1 : 0}
          >
            <img src={apple.src} alt="" draggable="false" />
          </button>
        )
      })}
    </div>
  )
}
