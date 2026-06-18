import { useParams, Link } from 'react-router-dom'
import { getProject } from '../data/projects'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) {
    return (
      <main className="px-8 py-12">
        <p className="text-gray-500">Project not found.</p>
        <Link to="/" className="text-sm underline underline-offset-4 mt-4 inline-block">
          ← Back to work
        </Link>
      </main>
    )
  }

  return (
    <main className="px-8 py-12 max-w-3xl">
      <Link to="/" className="text-sm underline underline-offset-4 mb-8 inline-block">
        ← Back
      </Link>

      <div className="flex items-baseline gap-4 mb-2">
        <h1 className="text-4xl font-medium">{project.title}</h1>
        <span className="text-gray-500 text-sm">{project.year}</span>
      </div>

      <p className="text-gray-600 mb-6">{project.tagline}</p>

      <div className="flex gap-2 mb-10">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs border px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {project.coverImage && (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full aspect-video object-cover mb-10"
        />
      )}

      <section className="prose prose-gray max-w-none">
        <p>{project.overview}</p>

        {project.sections.map((section, i) => (
          <div key={i} className="mt-10">
            {section.heading && <h2 className="text-2xl font-medium mb-4">{section.heading}</h2>}
            {section.body && <p>{section.body}</p>}
            {section.image && (
              <img src={section.image} alt={section.heading ?? ''} className="w-full mt-4" />
            )}
          </div>
        ))}
      </section>
    </main>
  )
}
