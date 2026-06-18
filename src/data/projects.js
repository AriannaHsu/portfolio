export const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    tagline: 'Short description of what this project is about.',
    tags: ['UX Design', 'Research'],
    year: '2025',
    coverImage: null,
    overview: 'Full overview text for the case study goes here.',
    sections: [],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
