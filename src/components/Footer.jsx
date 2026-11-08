import { Link } from 'react-router-dom'
import basketSrc from '../assets/basket.webp'

const RESUME_URL = '/Arianna-Hsu-Resume.pdf'
const HEADLINE = 'let’s plant seeds together for a better tomorrow'

const navLinks = [
  { label: 'Work', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Basket', to: '/gallery' },
]

const connectLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arianna-hsu', external: true },
  { label: 'Email', href: 'mailto:ach282@cornell.edu' },
  { label: 'Resume', href: RESUME_URL, external: true, note: 'PDF' },
]

// Headline set on a gentle arch over the basket (Figma annotation: "curve this").
// Drawn as SVG text on paths so it scales as one unit; screen readers get the plain heading.
function CurvedHeadline() {
  return (
    <h2 className="footer__headline">
      <span className="sr-only">{HEADLINE}</span>
      <svg viewBox="0 0 600 170" aria-hidden="true" focusable="false">
        <path id="footer-arc-1" d="M 20 84 Q 300 24 580 84" fill="none" />
        <path id="footer-arc-2" d="M 120 150 Q 300 110 480 150" fill="none" />
        <text>
          <textPath href="#footer-arc-1" startOffset="50%" textAnchor="middle">let’s plant seeds together for</textPath>
        </text>
        <text>
          <textPath href="#footer-arc-2" startOffset="50%" textAnchor="middle">a better tomorrow</textPath>
        </text>
      </svg>
    </h2>
  )
}

export default function Footer() {
  return (
    <footer className="footer" data-nav-theme="earth">
      <div className="footer__main">
        <p className="footer__thanks">thanks for checking out my basket!</p>
        <CurvedHeadline />

        <div className="footer__basket-row">
          <nav className="footer__col footer__col--nav" aria-labelledby="footer-nav-title">
            <h3 id="footer-nav-title" className="footer__col-title">Navigation</h3>
            <ul className="footer__links">
              {navLinks.map(({ label, to }) => (
                <li key={label}><Link to={to} className="footer__link">{label}</Link></li>
              ))}
            </ul>
          </nav>

          <img className="footer__basket" src={basketSrc} alt="" draggable="false" />

          <div className="footer__col footer__col--connect">
            <h3 className="footer__col-title">Connect</h3>
            <ul className="footer__links">
              {connectLinks.map(({ label, href, external, note }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer__link"
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                    {(note || external) && (
                      <span className="sr-only">
                        {` (${[note, external && 'opens in a new tab'].filter(Boolean).join(', ')})`}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <p><strong>©</strong> {new Date().getFullYear()} Arianna Hsu</p>
        <p>
          <a
            href="https://www.desiringgod.org/solid-joys/a-six-point-summary-of-the-gospel"
            className="footer__link footer__link--bar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by Him to Create<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  )
}
