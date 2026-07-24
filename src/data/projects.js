export const projects = [
  {
    slug: 'interact',
    title: 'InterACT',
    tagline: 'Helped parents teach their children about internet safety through open dialogue, in partnership with the Alaska Children\'s Trust.',
    meta: 'Mobile · 0–1',
    thumbnailLabel: 'interact — mobile screens',
    tags: ['UX Design', 'Research', 'Mobile'],
    year: '2024',
    coverImage: null,
    overview: '',
    sections: [],
  },
  {
    slug: 'google-calendar',
    title: 'Google Calendar',
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
    slug: 'electricity-connection',
    title: 'Electricity Connection Service',
    tagline: 'Increased efficiency and reduced corruption with a digital application and approval platform for electricity connections.',
    meta: 'Mobile · 0–1',
    thumbnailLabel: 'electricity connection service — mobile',
    tags: ['UX Design', 'Research', 'Mobile'],
    year: '2023',
    coverImage: null,
    overview: '',
    sections: [],
  },
  {
    slug: 'hudson-valley',
    title: 'Hudson Valley',
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
