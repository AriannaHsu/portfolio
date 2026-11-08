import { Link } from 'react-router-dom'
import { CaseSection, Figure, LoopVideo, Option, ProsCons } from '../../components/case-study/CaseStudyParts'

import finalFlow from '../../assets/interact/final-flow.mp4'
import scenariosVideo from '../../assets/interact/scenarios.mp4'
import deckPhoto from '../../assets/interact/deck-photo.webp'
import cardFront from '../../assets/interact/card-front.webp'
import cardBack from '../../assets/interact/card-back.webp'
import duolingoPath from '../../assets/interact/duolingo-path.webp'
import duolingoStats from '../../assets/interact/duolingo-stats.webp'
import holsomDecks from '../../assets/interact/holsom-decks.webp'
import holsomCard from '../../assets/interact/holsom-card.webp'
import priorityMatrix from '../../assets/interact/priority-matrix.webp'
import infoArchitecture from '../../assets/interact/information-architecture.svg'
import homeA from '../../assets/interact/home-a.webp'
import homeB from '../../assets/interact/home-b.webp'
import homeC from '../../assets/interact/home-c.webp'
import trackMonthly from '../../assets/interact/track-monthly.webp'
import trackProgress from '../../assets/interact/track-progress.webp'
import skillsDropdown from '../../assets/interact/skills-dropdown.webp'
import skillsModal from '../../assets/interact/skills-modal.webp'
import simpleHome from '../../assets/interact/simple-home.webp'
import simpleProgress from '../../assets/interact/simple-progress.webp'
import designSystem from '../../assets/interact/design-system.webp'

// Content carried over from the old (Framer) portfolio's InterACT page.

const meta = [
  { term: 'Role', value: ['Designer'] },
  { term: 'Timeline', value: ['Feb – May 2025'] },
  { term: 'Team', value: ['1 Product Manager', '3 Product Designers'] },
  { term: 'Skills', value: ['Figma/FigJam, User Research,', 'User Testing, Prototyping,', 'Mobile Design, 0–1'] },
]

const painPoints = [
  'Hard for users to quickly find a card on their desired topic',
  'Physical size limits the amount of information available',
  'Printing and distributing physical deck is costly',
]

const howMightWe = [
  'Create comfortable environments for discussion of sensitive content?',
  'Guide parents who may also be inexperienced with the internet?',
  'Help parents navigate large amount of information?',
  'Encourage more consistent tool usage and ongoing conversation?',
]

const mvp = [
  { title: 'Achievements', body: 'Encourage full deck usage' },
  { title: 'Explore Decks', body: 'Easy filter / search through all decks' },
  { title: 'Recent', body: 'Continue previous conversations' },
  { title: 'Recommendations', body: 'Try similar topics / levels' },
]

export default function Interact() {
  return (
    <main className="case-study">
      <Link to="/" className="cs-back">
        <span aria-hidden="true">←</span> Back to work
      </Link>

      {/* ── Intro ── */}
      <header className="cs-hero">
        <div className="cs-hero__text">
          <h1 className="cs-h1">
            InterACT<span className="cs-h1__sub">Facilitating conversations about online safety</span>
          </h1>

          <p className="cs-eyebrow">Context</p>
          <p className="cs-lead">
            In Alaska, costly and unreliable internet access is improving with satellite service. Many parents are
            concerned about safety as they learn to navigate the internet themselves. To address this, the Alaska
            Children’s Trust (ACT) created a deck of cards with discussion questions and educational information.
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
            In collaboration with ACT, Hack4Impact designed the app InterACT to consolidate conversation starters,
            parenting tips, and activity ideas, and make this resource more accessible for all families.
          </p>
        </div>
        <LoopVideo
          className="cs-phone"
          src={finalFlow}
          label="InterACT app walkthrough: the progress home screen, recent decks, related topics and a conversation card"
        />
      </header>

      {/* ── Current solution ── */}
      <CaseSection id="current" eyebrow="Current solution" title="Pain points with physical deck">
        <p className="cs-body">
          ACT’s <em>Conversations for Families</em> is a ring-bound deck of cards with discussion questions on one side
          and educational information on the other, organized by maturity level and topic.
        </p>
        <div className="cs-grid cs-grid--3">
          <Figure src={deckPhoto} alt="The Conversations for Families cards held together on a metal ring." caption="Physical deck of cards attached by a ring" />
          <Figure src={cardFront} alt="Card front: “How do you decide if an app or website is safe to use?”, topic Platforms & Privacy." caption="Front side of card shows a discussion question" />
          <Figure src={cardBack} alt="Card back with an explanation about app and website safety and a parent tip listing red flags." caption="Back side of card contains information and parent tip" />
        </div>
        <p className="cs-body">
          ACT was concerned about the physical deck’s limited scalability. With the rise of AI, they wanted to provide
          more information than the deck’s size and production costs allowed.
        </p>
        <ul className="cs-cards cs-grid cs-grid--3">
          {painPoints.map((p) => <li key={p} className="cs-card">{p}</li>)}
        </ul>
      </CaseSection>

      {/* ── User research ── */}
      <CaseSection id="research" eyebrow="User research" title="Understanding both prospective users">
        <p className="cs-body">
          My team interviewed 10 teenagers and parents to understand their feelings about the current solution, as well
          as their goals and use cases.
        </p>
        <div className="cs-pov">
          <div className="cs-pov__col">
            <h3 className="cs-h4">Parent POV</h3>
            <ul className="cs-bubbles">
              <li className="cs-bubble">Want to <strong>tailor the deck</strong> to focus on specific topics and skip sensitive ones</li>
              <li className="cs-bubble"><strong>Unlikely to reuse</strong> the deck but <strong>still want to monitor</strong> child’s usage</li>
            </ul>
          </div>
          <div className="cs-pov__col">
            <h3 className="cs-h4">Child POV</h3>
            <ul className="cs-bubbles">
              <li className="cs-bubble cs-bubble--dark">Info is useful, but <strong>unlikely to change their behavior</strong></li>
              <li className="cs-bubble cs-bubble--dark"><strong>Don’t want to be lectured</strong> about how they use technology</li>
            </ul>
          </div>
        </div>
      </CaseSection>

      {/* ── Competitor research ── */}
      <CaseSection id="competitors" eyebrow="Competitor research" title="Designing for education vs conversation">
        <p className="cs-body">
          Since this resource aims to teach online safety through honest conversations, I drew inspiration from two apps
          that excel in these aspects.
        </p>
        <div className="cs-grid cs-grid--2 cs-competitors">
          <div>
            <h3 className="cs-h4">Duolingo utilizes gamification to make learning fun.</h3>
            <div className="cs-grid cs-grid--2">
              <div>
                <img className="cs-screen" src={duolingoPath} alt="Duolingo lesson screen with a character, progress bar and a bright yellow path." loading="lazy" />
                <ProsCons pros={['Engaging visual and motion design']} cons={['Visuals could distract from conversation']} />
              </div>
              <div>
                <img className="cs-screen" src={duolingoStats} alt="Duolingo stats screen with an XP chart, streak, league and achievement badges." loading="lazy" />
                <ProsCons pros={['Points and streak trackers encourage consistency']} cons={['Competition isn’t conducive to honest conversations']} />
              </div>
            </div>
          </div>
          <div>
            <h3 className="cs-h4">Holsom focuses on building relationships through dialogue.</h3>
            <div className="cs-grid cs-grid--2">
              <div>
                <img className="cs-screen" src={holsomDecks} alt="Holsom deck library: a grid of muted, earthy deck tiles." loading="lazy" />
                <ProsCons pros={['Minimal UI and color scheme']} />
              </div>
              <div>
                <img className="cs-screen" src={holsomCard} alt="Holsom card screen showing one question: “How cringe were your first social media profiles?”" loading="lazy" />
                <ProsCons pros={['Focuses on driving conversation']} cons={['Not suited for providing additional information or resources']} />
              </div>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* ── Ideation ── */}
      <CaseSection id="ideation" eyebrow="Ideating solutions" title="How might we…">
        <p className="cs-body">Based on our interview insights, my team developed these questions to guide feature ideation.</p>
        <ul className="cs-cards cs-grid cs-grid--4">
          {howMightWe.map((q) => <li key={q} className="cs-card">{q}</li>)}
        </ul>
        <p className="cs-body">We organized our solution ideas on the following priority matrix, focusing on the features with the highest impact.</p>
        <Figure
          className="cs-figure--matrix"
          src={priorityMatrix}
          alt="Impact/effort priority matrix of feature ideas. High-impact ideas include starred cards, picking up where you left off, topic summaries, tips for starting conversations, removing cards, filtering by topic, search, and 'what's the best response' scenario learning."
        />
      </CaseSection>

      {/* ── Information architecture ── */}
      <CaseSection id="ia" eyebrow="Information architecture" title="Keeping it simple">
        <p className="cs-body">
          To keep the focus on conversations, we designed a simple information architecture. I worked on the ‘Home’
          screen, while my teammates designed ‘Explore’ and ‘Deck.’
        </p>
        <Figure
          className="cs-figure--ia"
          src={infoArchitecture}
          alt="Site map. InterACT leads to Home (Progress, Explore Decks, Recent Decks, Recommended, Profiles). Explore Decks leads to Explore (Filters, All Decks). Recent Decks and All Decks lead to Deck (Overview, Cards)."
        />
      </CaseSection>

      {/* ── Iteration ── */}
      <CaseSection id="iteration" eyebrow="Iteration" title="Simple home page" wide>
        <p className="cs-body">
          When I was initially iterating on the “Home” page, I wanted to prioritize setting the tone for genuine
          conversation rather than seeking gamification-based achievements.
        </p>
        <div className="cs-grid cs-grid--3 cs-options">
          <Option
            label="A" title="Jump back into recent decks"
            image={homeA} imageClassName="cs-option__img--phone"
            alt="Wireframe: a Recent row with one deck, then Topics and Age Range rows."
            pros={['Jump back into ongoing conversation']}
            cons={['Scrolling to find desired deck can be annoying']}
          />
          <Option
            label="B" title="Overview of all topics, filter by level" chosen
            image={homeB} imageClassName="cs-option__img--phone"
            alt="Wireframe: All / Easy / Medium / Hard filter chips above a grid of every topic deck."
            pros={['Can see all topics at once', 'Removes the need for a separate “Filter” page']}
            cons={['Resume button is less obvious than dedicated “Recent” row']}
          />
          <Option
            label="C" title="Highlight achievements"
            image={homeC} imageClassName="cs-option__img--phone"
            alt="Wireframe: stats for conversations, completed decks and week streak above Topics and Age Range rows."
            pros={['Removes the need for a separate ‘Achievements’ page']}
            cons={['Sets the tone that “Achievements” is goal rather than conversation']}
          />
        </div>

        <div className="cs-split">
          <div>
            <h3 className="cs-h3">Adding hypothetical “Scenarios” questions to teach best responses</h3>
            <p className="cs-body">
              To help children feel more comfortable discussing sensitive online behaviors, I suggested reframing
              questions from “Have you ever…” to “What would you do if…”
            </p>
            <p className="cs-body">
              Using hypothetical scenarios allows parents to teach children how to respond to different situations
              without making them feel judged for their past behavior.
            </p>
          </div>
          <LoopVideo
            className="cs-phone"
            src={scenariosVideo}
            label="Prototype switching between a Questions tab and a Scenarios tab of topic decks"
          />
        </div>

        <h3 className="cs-h3">Tracking achievements…</h3>
        <p className="cs-body">
          I wanted to track users’ progress and frame them as achievements to excite users to return to the app. I
          thought it could be helpful.
        </p>
        <div className="cs-grid cs-grid--2 cs-options">
          <Option
            level={4} label="A" title="Monthly progress tracking"
            image={trackMonthly}
            alt="Line chart of cards discussed per month, January to July, for Child 1 (43 cards) and Child 2 (18 cards)."
            pros={['Encourages consistent conversations']}
            cons={['Looks cluttered for 3+ siblings', 'Less meaningful with limited number of cards']}
          />
          <Option
            level={4} label="B" title="Cards remaining" chosen
            image={trackProgress}
            alt="Progress card: “Empower your child to navigate the online world safely”, 25 cards remaining, last check-in 1 month ago, 5 decks completed."
            pros={['Emphasizes cards remaining to encourage returning to the app', 'Reminds parents of the app’s goal to encourage completion']}
          />
        </div>

        <h3 className="cs-h3">…or skills learned instead!</h3>
        <p className="cs-body">
          I shifted the focus to tracking which cards have been discussed for each skill within a topic to show parents
          a measurable metric on how the app has helped them educate their child about online safety.
        </p>
        <div className="cs-grid cs-grid--2 cs-options">
          <Option
            level={4} label="A" title="Dropdown"
            image={skillsDropdown} imageClassName="cs-option__img--phone"
            alt="Expandable list of topics; Inappropriate Content is open, showing skills such as asking for consent, reporting content and handling mature photos."
            pros={['Can compare skills across different topics']}
            cons={['Continually pressing dropdown can be annoying']}
          />
          <Option
            level={4} label="B" title="Cards + Modal" chosen
            image={skillsModal}
            alt="Grid of topic cards with progress like 1 of 2, next to an Inappropriate Content modal listing questions under Asking for consent and Handling mature content."
            pros={['“Achievements” screen is simpler']}
            cons={['Opening and closing modals can be annoying']}
          />
        </div>

        <h3 className="cs-h3">Actually… I need to keep it SIMPLE</h3>
        <p className="cs-body">
          After further discussion with the client, I learned that creating new ‘Scenarios’ questions for all topics or
          labeling each card with skills would be unfeasible. Instead, the client preferred focusing on conversation
          starters for current topics, such as AI usage. I streamlined the features to focus on enabling honest
          conversations while keeping them exciting.
        </p>
        <div className="cs-combine">
          <Figure src={simpleHome} className="cs-figure--phone" alt="Wireframe: Recent row, Topics and Age Range." caption="Recent + Recommendations" />
          <span className="cs-combine__plus" aria-hidden="true">+</span>
          <Figure src={simpleProgress} alt="Progress card with 25 cards remaining, last check-in and decks completed." caption="Encouraging progress" />
        </div>
      </CaseSection>

      {/* ── Design system ── */}
      <CaseSection id="design-system" eyebrow="Design system" title="Adding playfulness through color and style" wide>
        <p className="cs-body">
          We chose Goldplay for playful headers paired with Jost for clean, readable body text, and we drew inspiration
          from ACT’s brand colors (blues, greens, and purples).
        </p>
        <Figure
          src={designSystem}
          alt="InterACT design system: type scale from Heading Large Bold 32px to Label 12px, and color palettes for neutral greys, primary blues, secondary yellows and greens, tertiary purples, and black and white."
        />
      </CaseSection>

      {/* ── Final flow ── */}
      <CaseSection id="final" eyebrow="Final flow" title="Putting it all together">
        <div className="cs-split">
          <div>
            <p className="cs-body">I decided to focus on these features for the MVP:</p>
            <dl className="cs-features">
              {mvp.map(({ title, body }) => (
                <div key={title}>
                  <dt className="cs-h4">{title}</dt>
                  <dd>{body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LoopVideo
            className="cs-phone"
            src={finalFlow}
            label="Final InterACT flow: progress, explore decks, recent and related topics"
          />
        </div>
      </CaseSection>

      {/* ── Reflection ── */}
      <CaseSection id="reflection" eyebrow="Reflection" title="My own learning">
        <p className="cs-body">
          This was my first time designing 0–1, and I learned a lot about the product design process and client work.
          I’m really grateful to my PM and fellow designers for their support and advice.
        </p>
        <h3 className="cs-h4">Don’t assume the user is like you</h3>
        <p className="cs-body">
          While I grew up surrounded by tech in the Bay Area, many Alaskans are still unfamiliar with the internet. My
          team initially jumped into design but hit a roadblock without concrete user data, so I realized we needed to
          step back and conduct interviews. Research revealed that some Alaskan parents are just as new to the internet
          as their children, leading me to design a simple app focused on clear information and conversation.
        </p>
        <h3 className="cs-h4">Honor the client’s constraints</h3>
        <p className="cs-body">
          I was excited about features like the “Scenario” questions, which would let children practice online safety
          without feeling interrogated, and the “Skills” tracking, which would show parents the progress they’ve made.
          But I had to recognize the client’s constraints and goals. Since the client wanted to prioritize creating new
          question cards on current issues like AI, they were unable to provide the extra material needed to implement
          these features.
        </p>
      </CaseSection>
    </main>
  )
}
