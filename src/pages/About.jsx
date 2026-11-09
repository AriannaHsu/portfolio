import '../styles/about.css'
import portrait from '../assets/about/portrait.webp'
import goldenGate from '../assets/about/golden-gate.webp'
import bunny from '../assets/about/bunny.webp'
import waterfall from '../assets/about/waterfall.webp'
import cafe from '../assets/about/cafe.webp'
import team from '../assets/about/team.webp'
import bassoon from '../assets/about/bassoon.webp'

// Content carried over from the old Framer site (old-portfolio/about).
const EXPERIENCE = [
  { role: 'Researcher', org: 'Library Privacy License Analysis', dates: 'Sep 2025 – Present' },
  { role: 'Analyst', org: 'Cornell Data Journal', dates: 'Sep 2025 – Present' },
  { role: 'Designer', org: 'Hack4Impact', dates: 'Feb 2025 – Present' },
  { role: 'Design Intern', org: 'Develop for Good', dates: 'Jul – Aug 2025' },
  { role: 'Senior Associate', org: 'Cornell Data Strategy', dates: 'Feb 2025 – Present' },
  { role: 'Volunteer', org: 'Girls Who Code', dates: 'Feb 2025 – Present' },
]

// Rows of two, alternating which side gets the wide photo.
const PHOTO_ROWS = [
  [
    { src: goldenGate, alt: 'Arianna hugging her brother on a hillside above the Golden Gate Bridge' },
    { src: bunny, alt: 'Arianna smiling outdoors, holding a rabbit wrapped in a sweater' },
  ],
  [
    { src: waterfall, alt: 'A wide waterfall over stone ledges at dusk' },
    { src: cafe, alt: 'Arianna at a café table by tall windows overlooking a street market' },
  ],
  [
    { src: team, alt: 'Arianna and three designers from Hack4Impact' },
    { src: bassoon, alt: 'A hand holding a reed up beside a bassoon' },
  ],
]

export default function About() {
  return (
    <main className="about">
      <section className="about__intro" aria-labelledby="about-title">
        <img
          className="about__portrait"
          src={portrait}
          alt="Arianna smiling in a selfie on a grassy hillside above the ocean"
        />
        <div className="about__bio">
          <h1 id="about-title" className="about__h1">Hi there, I’m Arianna!</h1>
          <p>
            I’m a Cornell student studying Information Science, Systems, and Technology with concentrations in
            Interactive Technologies and Data Science, and minors in Business and AI.
          </p>
          <p>
            During a marketing internship, I discovered the power of combining visual design and data analysis,
            using A/B testing to tailor posts and break the registration record. Since then, I’ve worked on UI/UX
            design projects expanding digital literacy in Alaska and improving electricity access in Benin.
          </p>
          <p>
            I’m passionate about uncovering user insights and turning them into solutions that create value for
            both users and businesses. Looking ahead, I’m eager to apply these skills to help socially responsible
            companies design products with meaningful impact.
          </p>
        </div>
      </section>

      <section className="about__world" aria-labelledby="world-title">
        <div>
          <h2 id="world-title" className="about__h2">Peek into my world</h2>
          <ul className="about__roles">
            {EXPERIENCE.map(({ role, org, dates }) => (
              <li key={org} className="about__role">
                <p className="about__role-title">
                  {role} @ <span className="about__org">{org}</span>
                </p>
                <p className="about__dates">{dates}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="about__photos">
          {PHOTO_ROWS.map((row, i) => (
            <div key={i} className={`about__photo-row${i % 2 ? ' about__photo-row--flip' : ''}`}>
              {row.map((photo) => (
                <img key={photo.src} className="about__photo" src={photo.src} alt={photo.alt} loading="lazy" />
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
