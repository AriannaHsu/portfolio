export const projects = [
  {
    slug: 'interact',
    title: 'InterACT',
    heroLine: 'through helping parents talk with their kids about online safety',
    tagline: 'Helped parents teach their children about internet safety through open dialogue, in partnership with the Alaska Children\'s Trust.',
    meta: 'Mobile · 0–1',
    thumbnailLabel: 'interact — mobile screens',
    tags: ['UX Design', 'Research', 'Mobile'],
    year: '2025', // Feb – May 2025, per the case study
    coverImage: null,
    overview: '', // InterACT has a hand-built page: src/pages/case-studies/Interact.jsx
    sections: [],
  },
  {
    slug: 'google-calendar',
    title: 'Google Calendar',
    heroLine: 'through making it easier for groups to find a time to meet',
    tagline: 'Simplified group event scheduling by letting guests share their availability and preferences for meeting times.',
    meta: 'Desktop · Case study',
    thumbnailLabel: 'google calendar — desktop',
    tags: ['UX Design', 'Product'],
    year: '2024',
    coverImage: null,
    overview: '',
    sections: [],
  },
  {
    slug: 'rethink-food',
    title: 'Rethink Food',
    heroLine: 'through showing donors the impact of their meals on communities',
    tagline: 'Visualized donation impact on communities by connecting partner data to an interactive map for donors.',
    meta: 'Desktop · Redesign',
    thumbnailLabel: 'rethink food — partner map',
    tags: ['UX Design', 'Research', 'Desktop'],
    year: '2025', // Sep – Dec 2025, per the case study
    coverImage: null,
    overview: '', // Rethink Food has a hand-built page: src/pages/case-studies/RethinkFood.jsx
    sections: [],
  },
  {
    slug: 'hudson-valley',
    title: 'Hudson Valley',
    heroLine: 'through expanding access to sustainable fibers',
    tagline: 'Stremalined inventory tracking of 200+ lbs of wool and increased accessibility of sustainable fibers in the Northeast.',
    meta: 'Desktop · 0–1',
    thumbnailLabel: 'hudson valley — desktop screens',
    tags: ['UX Design', 'Desktop'],
    year: '2024',
    coverImage: null,
    overview: '',
    sections: [],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
