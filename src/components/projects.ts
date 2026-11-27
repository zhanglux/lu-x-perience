import type { ChildPageKey } from './childPages';

export interface Project {
  id: string;
  name: string;
  /** One-line summary shown on the homepage card and in the terminal list. */
  description: string;
  company: string;
  tags: string[];
  status: string;
  year: string;
  /** Path relative to the site base path. */
  path: string;
  childKey: ChildPageKey;
  /** Card image, relative to the site base path. */
  image: string;
  imageAlt: string;
}

/** Single source of truth for the case studies, in display order. */
export const projects: Project[] = [
  {
    id: '001',
    name: 'Redesigning search',
    description:
      'Five years taking search from hand-written Boolean strings to asking a plain question.',
    company: 'Signal AI',
    tags: ['Product Design', 'AI/LLM', 'Interactive prototype'],
    status: 'In progress',
    year: '2021 – present',
    path: '/the-search-evolution',
    childKey: 'the-search-evolution',
    image: '/search-2.0/search-before-after.webp',
    imageAlt:
      'Before and after: the old dark Boolean search screen behind the new key message analysis flow.',
  },
  {
    id: '002',
    name: 'Design System Rebuild',
    description:
      'Replacing Material UI with a token system and component library built on React Aria after a rebrand.',
    company: 'Signal AI',
    tags: ['Design Systems', 'React Aria', 'Design Tokens'],
    status: 'In progress',
    year: '2025 – 2026',
    path: '/design-system-rebuild',
    childKey: 'design-system-rebuild',
    image: '/design-system/visual-language.png',
    imageAlt: 'Colour palettes, spacing scale and icon set from the new visual language.',
  },
  {
    id: '003',
    name: 'Innovation Week Prototypes',
    description:
      'Two AI tools from company hack weeks: a chat-based search builder, and demo workspaces generated from a Slack voice note.',
    company: 'Signal AI',
    tags: ['AI prototyping', 'Chat interface', 'Onboarding'],
    status: 'Shipped',
    year: '2024 – 2025',
    path: '/signal-ai-innovation-week',
    childKey: 'signal-ai-innovation-week',
    image: '/innovation-week/saved-search-wizard.png',
    imageAlt: 'Saved Search Wizard building a structured search from a chat prompt.',
  },
  {
    id: '004',
    name: 'Nature article collections: grid vs list',
    description:
      'Usage data suggested the collection page grid slowed readers down. A timed test showed the new list was faster on every viewport.',
    company: 'Springer Nature',
    tags: ['Evidence-based design', 'Data Analysis', 'Usability Testing'],
    status: 'Shipped',
    year: '2018',
    path: '/nature-article-collections',
    childKey: 'nature-article-collections',
    image: '/field-notes/collection-grid-vs-list.webp',
    imageAlt:
      'The redesigned Nature Outlook collection page on lymphoma, shown as a list of articles on two phones, a laptop and a tablet.',
  },
  {
    id: '005',
    name: 'Manuscript tracking for authors',
    description:
      'Making peer review status visible to authors on a platform handling 4,000+ submissions a month.',
    company: 'Springer Nature',
    tags: ['User Research', 'Experience Mapping', 'Impact Measurement'],
    status: 'Shipped',
    year: '2020',
    path: '/manuscript-tracking-author-view',
    childKey: 'manuscript-tracking-author-view',
    image: '/ms-tracking/submissions-manager.webp',
    imageAlt:
      'The Submissions Manager author dashboard: manuscripts in progress with their current status and next action, a mobile view of the same list, and close-ups of the status tabs and requests for amendments, payment details and licence.',
  },
  {
    id: '006',
    name: 'Springer journal redesign',
    description:
      'Research to find the real user problems behind a new platform for thousands of journals, then a journal homepage released step by step.',
    company: 'Springer Nature',
    tags: ['Research Methods', 'Journey Mapping', 'Iterative Delivery'],
    status: 'Shipped',
    year: '2019',
    path: '/springer-journal-redesign',
    childKey: 'springer-journal-redesign',
    image: '/field-notes/journal-redesign.webp',
    imageAlt:
      'The redesigned Springer journal homepage, showing the journal Rare Metals on a laptop, a phone and a tablet.',
  },
  {
    id: '007',
    name: 'End-to-end journal onboarding',
    description:
      'Mapped how journals get onto a new peer review platform, then helped the team decide what to solve first and how to measure it.',
    company: 'Springer Nature',
    tags: ['UX Strategy', 'Service Mapping', 'Success Metrics'],
    status: 'Research and strategy',
    year: '2021',
    path: '/journal-onboarding',
    childKey: 'journal-onboarding',
    image: '/field-notes/journal-onboarding-map.webp',
    imageAlt:
      'The journal onboarding admin tool: user goals and tasks beside wireframes for choosing a journal pattern and configuring its settings.',
  },
  {
    id: '008',
    name: 'Designing with the team',
    description:
      'Getting delivery teams to share the design work: habits that kept users in view, remote sketching sessions, and design sessions that reached across teams.',
    company: 'Springer Nature',
    tags: ['Cross-functional Collaboration', 'Facilitation', 'Team Practice'],
    status: 'Team practice',
    year: '2019 – 2021',
    path: '/designing-with-the-team',
    childKey: 'designing-with-the-team',
    image: '/field-notes/sketching-session.webp',
    imageAlt:
      'A shared online board from a remote sketching session: two author scenarios at the top, with each team member’s sketches below.',
  },
];

/** The interview take-home, highlighted on the homepage (the terminal lists it under `interview`). */
export const takeHomeProject: Project = {
  id: 'T01',
  name: 'Orbital Copilot',
  description:
    'An AI copilot for property due diligence that works through documents, issues and reports alongside real estate lawyers. Concept and coded prototype.',
  company: 'Take-home design task',
  tags: ['Product Design', 'Systems Thinking', 'Coded prototype'],
  status: 'Take-home design task',
  year: '2026',
  path: '/take-home-design-task',
  childKey: 'take-home-design-task',
  image: '/key-screens/screen2.png',
  imageAlt:
    'Transaction workspace with a knowledge base of documents, a Copilot chat suggesting a due diligence blueprint, and a toolbox of actions.',
};

const byKey = (key: ChildPageKey) => projects.find((p) => p.childKey === key)!;

export interface ProjectGroup {
  /** Anchor id on the homepage. */
  id: string;
  heading: string;
  intro?: string;
  projects: Project[];
}

/** Homepage groups, in display order. The first project of the first group is the large featured card. */
export const homeGroups: ProjectGroup[] = [
  {
    id: 'recent-work',
    heading: 'Recent work',
    projects: [byKey('the-search-evolution'), byKey('design-system-rebuild'), takeHomeProject],
  },
  {
    id: 'springer-nature',
    heading: 'Springer Nature · 2018 – 2021',
    intro: 'Research, strategy and team practice across Springer and Nature journals.',
    projects: [
      byKey('nature-article-collections'),
      byKey('manuscript-tracking-author-view'),
      byKey('springer-journal-redesign'),
      byKey('journal-onboarding'),
      byKey('designing-with-the-team'),
    ],
  },
];
