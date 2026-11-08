import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Hero from '../components/hero/Hero'
import CustomCursor from '../components/CustomCursor'

function Thumbnail({ label }) {
  return (
    <div className="project-card__thumb project-card__thumb--placeholder" aria-hidden="true">
      <span>[ {label} ]</span>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <CustomCursor />

      <Hero />

      {/* Projects: earth zone (Figma 49:1066) */}
      <section className="projects" data-nav-theme="earth" aria-labelledby="projects-title">
        <h2 id="projects-title" className="sr-only">Selected work</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className="project-card"
              data-cursor="case-study"
            >
              {project.coverImage ? (
                <img className="project-card__thumb" src={project.coverImage} alt="" />
              ) : (
                <Thumbnail label={project.thumbnailLabel || project.title} />
              )}
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.tagline}</p>
              <ul className="project-card__tags" aria-label="Tags">
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
