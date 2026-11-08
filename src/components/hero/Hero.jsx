import { projects } from '../../data/projects'
import AppleTree from './AppleTree'
import TypedTagline from './TypedTagline'
import groundSrc from '../../assets/hero/ground.webp'

// Order the tagline cycles through; each project needs a `heroLine` in projects.js.
const HERO_ORDER = ['hudson-valley', 'interact', 'rethink-food', 'google-calendar']

const lines = HERO_ORDER
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p?.heroLine)
  .map((p) => ({ slug: p.slug, title: p.title, text: p.heroLine }))

export default function Hero() {
  return (
    <section className="hero" data-nav-theme="sky" aria-labelledby="hero-title">
      <img className="hero__ground" src={groundSrc} alt="" draggable="false" />
      <AppleTree />

      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__eyebrow">Arianna Hsu’s designing for</span>
          <span className="hero__script">
            <span className="hero__human">human</span>{' '}
            <span className="hero__flourishing">flourishing</span>
          </span>
        </h1>
        {lines.length > 0 && <TypedTagline lines={lines} />}
      </div>
    </section>
  )
}
