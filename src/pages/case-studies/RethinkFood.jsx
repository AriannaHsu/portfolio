import { Link } from 'react-router-dom'
import { CaseSection, Figure, LoopVideo, Option, ProsCons } from '../../components/case-study/CaseStudyParts'

import walkthrough from '../../assets/rethink/final-walkthrough.mp4'
import laptop from '../../assets/rethink/laptop.webp'
import logo from '../../assets/rethink/logo.webp'
import annualReport from '../../assets/rethink/annual-report.webp'
import boroughMap from '../../assets/rethink/borough-map.webp'
import spreadsheet from '../../assets/rethink/spreadsheet.webp'
import partnerMap from '../../assets/rethink/partner-map.webp'
import iconTransparency from '../../assets/rethink/icon-transparency.svg'
import iconPurpose from '../../assets/rethink/icon-purpose.svg'
import iconImpact from '../../assets/rethink/icon-impact.svg'
import donorsChoose from '../../assets/rethink/donorschoose.webp'
import googleMaps from '../../assets/rethink/google-maps.webp'
import hmwTransparency from '../../assets/rethink/hmw-transparency.svg'
import hmwImpact from '../../assets/rethink/hmw-impact.svg'
import hmwConnection from '../../assets/rethink/hmw-connection.svg'
import hmwFind from '../../assets/rethink/hmw-find.svg'
import infoArchitecture from '../../assets/rethink/information-architecture.webp'
import fundA1 from '../../assets/rethink/fund-a1.webp'
import fundA2 from '../../assets/rethink/fund-a2.webp'
import fundB1 from '../../assets/rethink/fund-b1.webp'
import fundB2 from '../../assets/rethink/fund-b2.webp'
import fundC1 from '../../assets/rethink/fund-c1.webp'
import fundC2 from '../../assets/rethink/fund-c2.webp'
import missionA from '../../assets/rethink/mission-a.webp'
import missionB from '../../assets/rethink/mission-b.webp'
import partnerA from '../../assets/rethink/partner-a.webp'
import partnerB from '../../assets/rethink/partner-b.webp'
import demographicsA from '../../assets/rethink/demographics-a.webp'
import demographicsB from '../../assets/rethink/demographics-b.webp'
import dietA from '../../assets/rethink/diet-a.webp'
import dietB from '../../assets/rethink/diet-b.webp'
import dietC from '../../assets/rethink/diet-c.webp'
import mvpMatrix from '../../assets/rethink/mvp-matrix.webp'
import designSystem from '../../assets/rethink/design-system.webp'

// Content from the Rethink Food case study in Figma (PUx2XJAyVQzmLL9WsKlsgo, node 1:1797).
// Mockups are 2× exports; `width` keeps them at their designed size.

const RETHINK_GREEN = '#4E7C34'
const RETHINK_WASH = '#F0FDD4'

const meta = [
  { term: 'Role', value: ['Designer'] },
  { term: 'Timeline', value: ['Sep – Dec 2025'] },
  { term: 'Team', value: ['2 Product Managers', '3 Product Designers', '4 Developers'] },
  { term: 'Skills', value: ['Figma/FigJam, User Research,', 'User Testing, Prototyping,', 'Mobile Design, Redesign'] },
]

const insights = [
  {
    icon: iconTransparency,
    title: 'Financial transparency builds trust',
    body: 'Donors value organizations that demonstrate strong financial stewardship through precise financial statements. They expect Rethink Food’s impact to align with the scale of its funding.',
  },
  {
    icon: iconPurpose,
    title: 'Clarity of purpose and operations',
    body: 'Donors want to know why Rethink Food exists, how it addresses food insecurity, and what differentiates its approach from other organizations.',
  },
  {
    icon: iconImpact,
    title: 'Tangible, ongoing impact',
    body: 'Donors want to see proof of Rethink Food’s impact (i.e. program updates, photos, videos, or testimonials) and expect consistent follow-ups to show continued progress.',
  },
]

const howMightWe = [
  {
    icon: hmwTransparency,
    framed: true, // this SVG already includes its green circle
    text: <>Make <strong>financial transparency</strong> more visible and interactive so donors know their <strong>contributions</strong> are <strong>managed responsibly</strong> and <strong>drive real impact</strong>?</>,
  },
  {
    icon: hmwImpact,
    text: <>Highlight current <strong>scale, progress, and measurable impact</strong> in ways that <strong>build trust</strong> that Rethink Food’s <strong>distribution model is effective</strong>?</>,
  },
  {
    icon: hmwConnection,
    text: <>Foster <strong>emotional connection</strong> with Rethink’s mission and the communities they serve to <strong>motivate donations</strong> that <strong>support people the donor cares about</strong>?</>,
  },
  {
    icon: hmwFind,
    text: <>Help users to <strong>quickly find the necessary information</strong> to identify CBOs that <strong>match their donation priorities</strong>?</>,
  },
]

const competitors = [
  {
    name: 'Donors Choose',
    image: donorsChoose,
    alt: 'DonorsChoose map of New York classrooms: a school profile on the left with need tags and a donate button, and clustered, colour-coded pins on the map.',
    pros: [
      'Tags emphasize metrics that matter to donors',
      'Color coding highlights schools with the greatest need',
      'Clearly explains how donations will be used',
    ],
    cons: ['Overlapping map pins block visibility and clicks'],
  },
  {
    name: 'Google Maps',
    image: googleMaps,
    alt: 'Google Maps restaurant search: a results list, an open place panel with Overview, Menu and Reviews tabs, and pins on the map.',
    pros: [
      'Tabs make it easier for users to find relevant information',
      'Search panel makes it easier to compare one organization to other results that match search criteria',
    ],
    cons: ['Condensed text descriptions'],
  },
]

export default function RethinkFood() {
  return (
    <main className="case-study">
      <Link to="/" className="cs-back">
        <span aria-hidden="true">←</span> Back to work
      </Link>

      {/* ── Intro ── */}
      <header>
        <div className="cs-cover" style={{ background: RETHINK_WASH }}>
          <img src={laptop} alt="Laptop showing the Rethink Food partner map with a community organization’s details open beside the map." />
          <img className="cs-cover__logo" src={logo} alt="" />
        </div>

        <h1 className="cs-h1">
          Rethink Food<span className="cs-h1__sub">Visualizing donation impact on communities</span>
        </h1>

        <p className="cs-eyebrow">Context</p>
        <p className="cs-lead">
          Rethink Food fights food insecurity by buying surplus meals from local restaurants and distributing them
          through food banks, shelters, and community centers. Their partner data was buried in spreadsheets, so they
          engaged Hack4Impact to design a proof of concept to test how donor-facing visualizations could make this
          information more engaging and accessible online. Midway, Rethink Food recognized the potential impact and
          shifted priorities, expanding the scope from exploration to immediate implementation on their website.
        </p>

        <dl className="cs-meta">
          {meta.map(({ term, value }) => (
            <div key={term}>
              <dt className="cs-eyebrow">{term}</dt>
              {value.map((v) => <dd key={v}>{v}</dd>)}
            </div>
          ))}
        </dl>

        <p className="cs-eyebrow">Final solution</p>
        <p className="cs-body">
          Integrating real-time impact data with the partner map to help donors see tangible outcomes and support the
          partners or communities they care about most.
        </p>
        <LoopVideo
          className="cs-video--wide"
          src={walkthrough}
          label="Rethink Food partner map walkthrough: searching and filtering partners, then opening a community organization’s details"
        />
      </header>

      {/* ── Current solution ── */}
      <CaseSection id="current" eyebrow="Current solution" title="Static, general metrics">
        <p className="cs-body">
          Rethink Food shares only broad annual reports, leaving donors uncertain about their real-time local impact.
          Detailed data exists in spreadsheets but remains inaccessible to users.
        </p>
        <div className="cs-grid cs-grid--3" style={{ alignItems: 'center' }}>
          <Figure src={annualReport} alt="Rethink Food’s “2024 in numbers” report: $54.6M directed to local restaurants, 11.5M meals served, 65 community partners, 63 restaurant partners and 474,500 pounds of food rescued." />
          <Figure src={boroughMap} alt="“2024 in numbers” map of meals across New York City by borough, from 23,615 in Staten Island to 5.87M in Manhattan." />
          <Figure src={spreadsheet} alt="Blurred excerpt of Rethink Food’s partner spreadsheet with address, website, organization type and location columns." />
        </div>

        <h3 className="cs-h3">“Wait, how does this work?”</h3>
        <p className="cs-body">
          While Rethink Food’s current map showcases partner organizations, it is unclear how each partner is involved
          with Rethink Food’s operations. There is no way to identify relationships between partner Community-Based
          Organizations (CBOs) and restaurants.
        </p>
        <Figure
          className="cs-figure--matrix"
          src={partnerMap}
          alt="Rethink Food’s existing “Active Partner Network” map: a list of partners on the left and a dense cluster of pins over New York City."
        />
      </CaseSection>

      {/* ── User research ── */}
      <CaseSection id="research" eyebrow="User research" title="Understanding donor decision criteria">
        <p className="cs-body">
          Due to privacy constraints, we were unable to interview past Rethink donors. To better understand donor
          motivations, I conducted three interviews with people who had previously donated to other social causes.
        </p>
        <ul className="cs-grid cs-grid--3">
          {insights.map(({ icon, title, body }) => (
            <li key={title} className="cs-note">
              <img className="cs-note__icon" src={icon} alt="" />
              <h3 className="cs-h4">{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </CaseSection>

      {/* ── Competitor research ── */}
      <CaseSection id="competitors" eyebrow="Competitor research" title="Organizing map-based information">
        <p className="cs-body">
          To see how other products organize information on a map, I drew inspiration from two that do it well.
        </p>
        <div className="cs-grid cs-grid--2">
          {competitors.map((c, i) => (
            <div key={c.name} className="cs-competitor">
              <h3 className="cs-h4">{i + 1}. {c.name}</h3>
              <img src={c.image} alt={c.alt} loading="lazy" decoding="async" />
              <ProsCons pros={c.pros} cons={c.cons} />
            </div>
          ))}
        </div>
      </CaseSection>

      {/* ── Ideation ── */}
      <CaseSection id="ideation" eyebrow="Ideating solutions" title="How might we…">
        <p className="cs-body">Based on our interview insights, my team developed these questions to guide feature ideation.</p>
        <ul className="cs-grid cs-grid--4">
          {howMightWe.map(({ icon, framed, text }, i) => (
            <li key={i} className="cs-note">
              {framed ? (
                <img className="cs-note__icon" src={icon} alt="" />
              ) : (
                <span className="cs-badge" style={{ background: RETHINK_GREEN }}><img src={icon} alt="" /></span>
              )}
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </CaseSection>

      {/* ── Information architecture ── */}
      <CaseSection id="ia" eyebrow="Information architecture" title="Breaking down available data">
        <p className="cs-body">
          Rethink Food shared their spreadsheets and encouraged us to freely explore ways of visualizing the data for
          this proof of concept. I focused on visualizing CBO and restaurant data, while my teammates built filters and
          a metrics summary.
        </p>
        <Figure
          className="cs-figure--ia"
          src={infoArchitecture}
          alt="Information architecture. Rethink Food splits into Search & Filters (region, borough, district, demographics, dietary restrictions), Map, and Metric Summary (number of meals served, funding goal). Map holds CBO info (food served, distribution method, address, website, mission, demographics, restaurant partners) and Restaurant info (food served, address, website, CBO partners)."
        />
      </CaseSection>

      {/* ── Financial transparency ── */}
      <CaseSection id="impact" eyebrow="Financial transparency" title="Will my donation make an impact?">
        <h3 className="cs-h3">Funding goal progress (current & potential partners)</h3>
        <p className="cs-body">
          For the initial proof of concept, Rethink Food explored a new donation model where individual CBOs could
          receive contributions directly, rather than pooling all donations centrally. I iterated on visualizations
          showing each CBO’s progress toward quarterly meal goals, including both funding targets and meals provided.
          This allows donors to assess how effectively contributions are used, offering greater financial transparency.
          Since Rethink Food needs a specific amount of donations before launching a partnership, I also ideated ways of
          differentiating between a current partner’s progress and a potential partner’s progress.
        </p>
        <div className="cs-grid cs-grid--3 cs-options">
          <Option
            level={4}
            label="A"
            title="Icons"
            chosen
            images={[
              { src: fundA1, width: 365, alt: 'Current partner card: 500 meals per week, $2,500 more to reach next quarterly goal, a meal icon on a Q1–Q4 timeline, and a Sponsor a Meal button.' },
              { src: fundA2, width: 353, alt: 'Potential partner card: 500 meals per week, $2,500 to launch partnership, a progress bar ending in a rocket icon, and a Launch New Partnership button.' },
            ]}
            pros={[
              'Food icon keeps the focus on the impact of feeding people',
              'Allows for more visual distinction between current partner’s funding progress and start up fund progress for new partners',
            ]}
            cons={['Viewing progress over a full year can appear slower and risks discouraging donors']}
          />
          <Option
            level={4}
            label="B"
            title="Circular progress"
            images={[
              { src: fundB1, width: 365, alt: 'Current partner card: a ring showing $2500 to reach quarterly goal beside 500 meals needed per week and a Fund Meals button.' },
              { src: fundB2, width: 365, alt: 'Potential partner card: a ring showing $2500 to launch partnership beside 500 meals needed per week and a Launch CBO button.' },
            ]}
            pros={['Greater distinction between meals vs funding goal']}
            cons={['Left and right sides feel disconnected']}
          />
          <Option
            level={4}
            label="C"
            title="Progress bar"
            images={[
              { src: fundC1, width: 365, alt: 'Compact card: 500 meals per week, $2,500 to quarterly goal, a progress bar and a Give button.' },
              { src: fundC2, width: 365, alt: 'Compact card: 500 meals per week, $2,500 to launch partnership, a progress bar and a Give button.' },
            ]}
            pros={[
              'Takes up less space, doesn’t push distribution information out of view',
              'Donate button more closely tied to progress bar',
            ]}
            cons={['Less visual emphasis on progress bar']}
          />
        </div>
        <p className="cs-body">
          I chose option A because the food icon emphasizes the ultimate impact of feeding people, creating an
          emotional connection for donors. It also establishes the strongest visual hierarchy, guiding users from the
          number of meals served to the remaining funding needed, and lastly to the donation button.
        </p>
      </CaseSection>

      {/* ── Build trust ── */}
      <CaseSection id="trust" eyebrow="Build trust" title="…through an effective distribution method?">
        <h3 className="cs-h3">Mission statement</h3>
        <p className="cs-body">
          User research showed that donors want proof CBOs are committed to reducing food insecurity and effectively
          reach those in need. They specifically look for whether CBOs operate in high‑need areas and if meal
          distribution is open to all or limited to specific groups. Rethink Food was able to support this by providing
          each CBO’s mission and partnership history as evidence of their impact.
        </p>
        <div className="cs-grid cs-grid--2 cs-options">
          <Option
            level={4}
            label="A"
            title="Full “Mission” at the bottom"
            images={[{ src: missionA, width: 308, alt: 'About tab listing food served, distribution details, address and website, followed by the full mission paragraph at the bottom.' }]}
            cons={['Big paragraph of text is overwhelming']}
          />
          <Option
            level={4}
            label="B"
            title="Truncated “Mission” at the top"
            chosen
            images={[{ src: missionB, width: 308, alt: 'About tab opening with a two-line mission excerpt and a Read more link, followed by food served, distribution details, address and website.' }]}
            pros={[
              'Placing the “Mission” at the top emphasizes that it’s the core reason this CBO partners with Rethink Food',
              'Interested users can still read the “full Mission” after skimming the first part',
            ]}
          />
        </div>
        <p className="cs-body">
          I chose option B because the shorter version is more approachable, increasing the likelihood that users will
          read it. It also ensures the “Mission” remains visible rather than being hidden below distribution details,
          highlighting that goal alignment was a key factor in Rethink Food’s CBO selection criteria.
        </p>

        <h3 className="cs-h3">Flow of meals through partnerships</h3>
        <p className="cs-body">
          In order to show how excess food from restaurants ends up in the hands of people that need it, I decided to
          have CBOs link to their partner restaurants and vice versa.
        </p>
        <div className="cs-grid cs-grid--2 cs-options">
          <Option
            level={4}
            label="A"
            title="Partner cards"
            chosen
            images={[{ src: partnerA, width: 580, alt: 'A restaurant panel listing its partner CBOs as cards with funding progress, next to a CBO panel listing its partner restaurants as cards with cuisine tags.' }]}
            pros={['Provides the space to highlight information like the partner CBO’s funding progress']}
            cons={['Restaurant information about food served is redundant']}
          />
          <Option
            level={4}
            label="B"
            title="Partner links"
            chosen
            images={[{ src: partnerB, width: 580, alt: 'A restaurant panel listing partner CBOs as simple arrow links, next to a CBO panel naming its partner restaurants as inline links.' }]}
            pros={['More compact, doesn’t push other information down']}
            cons={['Doesn’t have room for information like CBO’s funding progress']}
          />
        </div>
        <p className="cs-body">
          I used option A for restaurants showing CBO partners and option B for CBOs showing restaurant partners.
          Displaying CBO partners with funding progress motivates users to donate to the restaurant’s partner CBOs,
          which is important because donations go to CBOs, not restaurants. For restaurants, limited information beyond
          cuisine and dietary restrictions makes a simple link sufficient to avoid displaying redundant information.
        </p>
      </CaseSection>

      {/* ── Foster connection ── */}
      <CaseSection id="connection" eyebrow="Foster connection" title="…for people I care about?">
        <h3 className="cs-h3">Demographics data</h3>
        <p className="cs-body">
          Donors want to know that meals reach those most in need, such as people below the poverty line, the elderly,
          and children, and prefer to support recipients whose backgrounds resonate with their own. I iterated on two
          ways to show the demographic data for the CBOs that have provided this data.
        </p>
        <div className="cs-grid cs-grid--2 cs-options">
          <Option
            level={4}
            label="A"
            title="Tabs"
            images={[{ src: demographicsA, width: 580, alt: 'CBO panel with About and Demographics tabs: one with poverty line, age and race bars, and one where the tab only says the data isn’t available.' }]}
            pros={['Organizing information into tabs makes it easier for users to find information']}
            cons={['Since most CBOs lack this data, the “Who We Serve” tab will be mostly empty']}
          />
          <Option
            level={4}
            label="B"
            title="No tabs"
            chosen
            images={[{ src: demographicsB, width: 580, alt: 'Single scrolling CBO panel ending in a Who We Serve section with poverty line, age and race bars, and a version where that section says the data isn’t available.' }]}
            pros={['No wasted tab when CBOs don’t have the demographics data']}
            cons={['Users have to scroll through lots of other information to get to the demographics data']}
          />
        </div>
        <p className="cs-body">
          I chose the second option since collecting this data from all CBOs isn’t feasible at the moment, making a
          separate tab unnecessary for the CBOs that do not have this demographic data.
        </p>

        <h3 className="cs-h3">Dietary restrictions</h3>
        <p className="cs-body">
          Rethink Food wants to emphasize that its meals meet religious and medical dietary needs. While there is a
          widely recognized halal icon, kosher symbols vary by the certification organization because different
          certification organizations have differing levels of leniency in following kosher rules. To avoid linking
          Rethink Food to any single certifier, I designed custom icons for dietary restrictions.
        </p>
        <div className="cs-grid cs-grid--3 cs-options">
          <Option
            level={4}
            label="A"
            title="Original text"
            images={[{ src: dietA, width: 283, alt: 'Kosher and Halal tags using the Hebrew and Arabic words as icons.' }]}
            cons={['Icons would be hard to recognize with small tags']}
          />
          <Option
            level={4}
            label="B"
            title="Letter on plate"
            chosen
            images={[{ src: dietB, width: 294, alt: 'Kosher and Halal tags with a fork, plate and knife icon, the plate marked K or H.' }]}
            pros={['Clear that the tag is food related']}
            cons={['Letters are too small to distinguish']}
          />
          <Option
            level={4}
            label="C"
            title="No plate"
            images={[{ src: dietC, width: 268, alt: 'Kosher and Halal tags with a larger K or H inside a simple circle.' }]}
            pros={['Easier to read the letters while maintaining focus on food']}
            cons={['Lighter visual weight than icons for other tags']}
          />
        </div>
        <p className="cs-body">
          I chose option B to keep icon styles consistent while making dietary restriction tags instantly recognizable
          as food-related. Although the letters are small, the adjacent text ensures users can still distinguish
          between kosher and halal.
        </p>
      </CaseSection>

      {/* ── Scope change ── */}
      <CaseSection id="mvp" eyebrow="Scope change" title="Why wait? Let’s implement it now!">
        <p className="cs-body">
          Rethink Food saw the potential impact of the initial designs and chose to implement them on their website
          right away. Because some data and functionalities were not yet available, I re‑evaluated the scope and
          defined a minimum viable product (MVP) that made the most of the currently available information. This
          ensured the launch delivered immediate value while leaving room for future enhancements once additional data
          and features became accessible.
        </p>
        <Figure
          className="cs-figure--matrix"
          src={mvpMatrix}
          alt="Impact vs effort matrix. Included: number of meals served (high impact), flow of meals from restaurant to CBO, dietary restriction tags, and open vs selective distribution tags. Left out: funding progress bar, CBO-specific donations, demographics data, regional poverty heat map, medically tailored meal tag and images."
        />
        <p className="cs-body">
          Ultimately, I included features only when the information was already available, since we had limited time to
          gather new data from Rethink Food’s partners. Rethink Food was also not ready to change their donation model to
          allow CBO-specific donations.
        </p>
      </CaseSection>

      {/* ── Design system ── */}
      <CaseSection id="design-system" eyebrow="Design system" title="Adapting the existing brand colors">
        <p className="cs-body">
          We edited some of the original colors on Rethink Food’s existing website to meet accessibility guidelines
          while maintaining visual consistency.
        </p>
        <Figure
          src={designSystem}
          alt="Rethink Food style guide: Outfit type scale from Title Hero (72px) to Body Small (14px), and neutral, text, primary green and secondary blue colour swatches with hex codes."
        />
      </CaseSection>

      {/* ── Final MVP ── */}
      <CaseSection id="final" eyebrow="Final MVP" title="Visualizing impact">
        <p className="cs-body">
          My final design highlights Rethink Food’s impact with tags showing service to youth, people in poverty,
          dietary needs, and weekly meal counts. It also clarifies CBO and restaurant operations and distribution
          models, reinforcing trust in Rethink Food’s judgment and financial stewardship.
        </p>
        <LoopVideo
          className="cs-video--wide"
          src={walkthrough}
          label="Final Rethink Food partner map: partner list with impact tags beside the map of New York City"
        />
      </CaseSection>

      {/* ── Reflection ── */}
      <CaseSection id="reflection" eyebrow="Reflection" title="My takeaways">
        <p className="cs-body">
          I enjoyed collaborating with developers to bring my designs to life during such a short turnaround. Looking
          forward, I hope Rethink Food will eventually implement features for CBO‑specific donations, allowing donors to
          support the organizations they most resonate with.
        </p>
        <h3 className="cs-h3">Provide clear documentation and communication</h3>
        <p className="cs-body">
          Developers need to understand your design decisions in order to implement them correctly. Beyond providing
          documentation, it’s important to communicate the intent behind your designs proactively.
        </p>
        <h3 className="cs-h3">Be adaptable</h3>
        <p className="cs-body">
          Project scopes can change, so it’s important to be able to adapt which features to prioritize while meeting
          technical and time constraints.
        </p>
      </CaseSection>
    </main>
  )
}
