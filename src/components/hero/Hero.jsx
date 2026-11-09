import { projects } from '../../data/projects'
import AppleTree from './AppleTree'
import TypedTagline from './TypedTagline'
import groundSrc from '../../assets/hero/ground.webp'

// Order the tagline cycles through; each project needs a `heroLine` in projects.js.
const HERO_ORDER = ['hudson-valley', 'interact', 'rethink-food', 'google-calendar']

// heroLine marks highlighted words with *asterisks*: "…about *online safety*".
// Odd-numbered pieces of the split are the highlighted ones.
function parseHeroLine(source) {
  const segments = source.split('*').map((text, i) => ({ text, hi: i % 2 === 1 })).filter((s) => s.text)
  return { segments, text: segments.map((s) => s.text).join('') }
}

const lines = HERO_ORDER
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p?.heroLine)
  .map((p) => ({ slug: p.slug, title: p.title, ...parseHeroLine(p.heroLine) }))

export default function Hero() {
  return (
    <section className="hero" data-nav-theme="sky" aria-labelledby="hero-title">
      <img className="hero__ground" src={groundSrc} alt="" draggable="false" />
      <AppleTree />

      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__eyebrow">Arianna Hsu designs for</span>
          <span className="hero__script">
            human flourishing
          </span>
        </h1>
        {lines.length > 0 && <TypedTagline lines={lines} />}
        <p className="hero__role">Leading design @ Hack4Impact</p>
      </div>
    </section>
  )
}
