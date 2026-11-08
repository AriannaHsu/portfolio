import { useEffect, useState } from 'react'

// Only Chromium supports SVG filters inside `backdrop-filter`. Other browsers would drop the
// whole declaration (and lose the blur), so they get the plain frosted fallback instead.
// eslint-disable-next-line react-refresh/only-export-components
export const supportsLiquidGlass =
  typeof navigator !== 'undefined' &&
  !!navigator.userAgentData?.brands?.some((b) => /Chromium/i.test(b.brand))

/**
 * Builds a displacement map for a pill shape: flat in the middle, bending the backdrop
 * along a thin bezel at the edges, like light through the rim of a glass lens.
 * R/G channels encode x/y offsets around neutral 128.
 */
function buildPillMap(w, h, bezel) {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(w, h)
  const r = h / 2
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // nearest point on the pill's centre line → outward normal and depth from the edge
      const cx = Math.min(Math.max(x + 0.5, r), w - r)
      const vx = x + 0.5 - cx
      const vy = y + 0.5 - r
      const len = Math.hypot(vx, vy) || 1
      const depth = r - len
      let dx = 0
      let dy = 0
      if (depth < bezel) {
        const k = Math.pow(1 - Math.max(depth, 0) / bezel, 2) // strongest right at the rim
        dx = (-vx / len) * k // sample from further inside → edge looks magnified
        dy = (-vy / len) * k
      }
      const i = (y * w + x) * 4
      img.data[i] = 128 + dx * 127
      img.data[i + 1] = 128 + dy * 127
      img.data[i + 2] = 128
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas.toDataURL()
}

/** Renders the SVG filter `#{id}` sized to `targetRef`, regenerating the map when it resizes. */
export default function LiquidGlassFilter({ id, targetRef, bezel = 14, scale = 26 }) {
  const [box, setBox] = useState(null)

  useEffect(() => {
    if (!supportsLiquidGlass || !targetRef.current) return
    const el = targetRef.current
    const ro = new ResizeObserver(() => {
      const w = Math.round(el.offsetWidth)
      const h = Math.round(el.offsetHeight)
      if (!w || !h) return
      setBox((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h, map: buildPillMap(w, h, bezel) }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [targetRef, bezel])

  if (!supportsLiquidGlass || !box) return null

  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute' }}>
      <filter
        id={id}
        x="0"
        y="0"
        width={box.w}
        height={box.h}
        filterUnits="userSpaceOnUse"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage href={box.map} x="0" y="0" width={box.w} height={box.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
