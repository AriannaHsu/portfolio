import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <main className="px-8 py-12">
      <h1 className="text-4xl font-medium mb-12">Work</h1>
      <ul className="grid gap-8">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`/work/${project.slug}`} className="group block">
              {project.coverImage && (
                <div className="w-full aspect-video bg-gray-100 mb-4 overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              {!project.coverImage && (
                <div className="w-full aspect-video bg-gray-100 mb-4" />
              )}
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-medium group-hover:underline underline-offset-4">
                  {project.title}
                </h2>
                <span className="text-sm text-gray-500">{project.year}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{project.tagline}</p>
              <div className="flex gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs border px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
